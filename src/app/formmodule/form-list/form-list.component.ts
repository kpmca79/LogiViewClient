import { Component, OnInit, ViewChild } from '@angular/core';
import { FormService } from "../../services/form.service";
import { Form } from "../../model/Form";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import { FormtypeDialogComponent } from '../../formmodule/formtype-dialog/formtype-dialog.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { Route, Router } from "@angular/router";

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent implements OnInit {

  forms: Form[]=[];
  dataSource: MatTableDataSource<Form>;
  displayedColumns: string[] = ['name','type','path', 'status','response','edit','stats'];
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  frm: Form;
   
  constructor(private frmSrv: FormService,public dialog: MatDialog,private router: Router) { }

  ngOnInit() {
      const formObj = this.frmSrv.getForms("Active",null).subscribe(data=>{
      let x= data
      this.forms=x.data;
      console.log("form size =", this.forms.length);
      this.dataSource = new MatTableDataSource<Form>(this.forms);
      console.log("datasource size =", this.dataSource.data.length);
      this.dataSource.paginator = this.paginator;
//      console.log("paginator size =", this.dataSource.paginator.length);
      
//      let abc = x._embedded;
//      console.log('form data->',abc);
//              this.forms = abc.Form;
      });
//      console.log(this.forms);
  }
  drop(event: CdkDragDrop<Form[]>) {
      moveItemInArray(this.forms, event.previousIndex, event.currentIndex);
    }
  showFormType() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '760px';
      dialogConfig.height = '400px';
      this.frm ={ id: '',name: '',type:'form',title: '',path: 'sample',
              status: 'Active',bgColor: '#cacaca',bgImage: '5d7411844c05a60408df1d49',header: '',
              footer: '',theme:'dark-theme',formFields:[], _links:'',style:'',btnStyle:'',opacity:0,
              response:0,
              pages:[],
              layout:'',
              pageBGColor:'',
              formBgImage:'',
              formImages:[],
              thanksdata: 'Thanks You, you have successfully submitted your response, you might get email confirmation for the same.',
              thankstype: 'message',
              formwidth:  600,      
              publishdate: null,
              publishtime: "00:00",
              publishtimezone: this.frmSrv.getClientTimezone(),
              publishstatus: "",
              publishuptodate: null,
              publishuptotime: "",
              visibility: "Public",
              publishnow: false,inputStyle:null,
              createdDate: new Date()};
      
       dialogConfig.data =this.frm;  
      const dialogRef = this.dialog.open( FormtypeDialogComponent, dialogConfig );
      dialogRef.afterClosed().subscribe( result => {
          console.log(result)
          if ( result==true ) {
              console.log("create result---->",dialogConfig.data.title);
              this.frm.title=dialogConfig.data.title;
              this.frm.name=dialogConfig.data.title;
              this.createForm();
              
          }
         
      } );
 }
 public createForm()
 {
   this.frmSrv.saveForm(this.frm, "").subscribe(response=>{
      console.log("new formid=",response.data); 
      this.frm.id=response.data;
      this.frmSrv.showNotification('top','center','Form created successfully','s');
      console.log("In form componenet form link0 is ",response);
      this.router.navigate(['/formBuilder', this.frm.id]);
      
   });
 }

}
