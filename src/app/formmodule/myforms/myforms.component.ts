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
import { ConfirmDialogComponent } from 'app/confirm-dialog/confirm-dialog.component';
import Utils from 'app/util/utils';
import { FormField } from 'app/model/FormField';

@Component({
  selector: 'myforms',
  templateUrl: './myforms.component.html',
  styleUrls: ['./myforms.component.css']
})
export class MyformsListComponent implements OnInit {

  forms: Form[];
  utils:Utils= new Utils();
  public pubURL="https://localhost:4200/form/";
  dataSource: MatTableDataSource<Form>;
  displayedColumnsold: string[] = ['name','type','path', 'status','response','edit','stats'];
  displayedColumns: string[] = ['checkbox','name','response','edit','stats'];
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  frm: Form;
  isSearchZero=false;

   
  constructor(private frmSrv: FormService,public dialog: MatDialog,private router: Router) { }
  searchform="";
  async ngOnInit() {
      this.forms=await this.frmSrv.getFormsAsync("Active",null,this.router);
      this.dataSource = new MatTableDataSource<Form>(this.forms);
      this.dataSource.paginator = this.paginator;
  }
  showView(form:Form)
  {

    window.open(this.pubURL+form.id, "_blank");
  }
  showSetting(form:Form){
    let url='formBuilder/'+form.id+'/settings'
    this.router.navigateByUrl(url);
  }
  deleteForm(form:Form) {
    const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  let msgStyle='style="font-size:14px;font-weight:600;"'
  let noteStyle='style="font-size:12px;"'
  dialogConfig.data = {
      id: 1,
      title: 'Delete Form',
      message: '<span>Are you sure you want to delete form ?</span><br><span class="note"> Deleted form will be moved to Trash and automatically deleted after 30 days?</span>'
  };

      const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
            form.status="Archived";
            this.frmSrv.saveForm(form,form.id).subscribe(data=>{console.log("Form archived successfully",form);this.ngOnInit();},error=>{console.log(error)});
        }
      });
  }
  async searchForm()
  {
    this.forms=await this.frmSrv.getFormsAsync("Active",this.searchform,this.router);
    if(!this.forms || this.forms.length==0)
      this.isSearchZero=true;
    else
      this.isSearchZero=false;
    this.dataSource = new MatTableDataSource<Form>(this.forms);
    this.dataSource.paginator = this.paginator;
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
      let submiitField:FormField= new FormField();
      submiitField.type="submit";
      submiitField.name="Submit";
      submiitField.title="Please wait";
      let formFields:FormField[]=[];
      formFields.push(submiitField);
      this.frm ={ id: '',name: '',type:'form',title: '',path: 'sample',
              status: 'Active',bgColor: '#cacaca',bgImage: '5d7411844c05a60408df1d49',header: '',
              footer: '',theme:'dark-theme',formFields:formFields, _links:'',style:'',btnStyle:'',opacity:0,
              response:0,
              layout:"classic",
              pages:[],
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
              console.log("Form type id is ",dialogConfig.data.layout)
              this.frm.title=dialogConfig.data.title;
              this.frm.name=dialogConfig.data.title;
              this.createForm();
              
          }
         
      },error=>{this.utils.processError(error,this.router)} );
 }
 public createForm()
 {
   this.frmSrv.saveForm(this.frm, "").subscribe(response=>{
      console.log("new formid=",response.data); 
      this.frm.id=response.data;
      this.frmSrv.showNotification('top','center','Form created successfully','s');
      console.log("In form componenet form link0 is ",response);
      this.router.navigate(['/formBuilder', this.frm.id]);
      
   },error=>{this.utils.processError(error,this.router)});
 }

}
