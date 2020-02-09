import { Component, OnInit } from '@angular/core';
import {  Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from  '@angular/material';
import { Form } from "app/model/Form";
import { FormService } from "app/services/form.service";



export interface FormType {
    id: string;
    value: string;
  }

@Component({
  selector: 'app-formtype-dialog',
  templateUrl: './formtype-dialog.component.html',
  styleUrls: ['./formtype-dialog.component.scss']
})
export class FormtypeDialogComponent implements OnInit {

   frm:Form;
    frmTitle="";
    formTypeId=1;
    frmTypes: FormType[] = [
                 {id: '1', value: 'All Questions On Single Page'},
                 {id: '2', value: 'Single Question On One Page'},
                 
               ];
    
    constructor(@Inject(MAT_DIALOG_DATA) public data: Form,  
                private frmSrv: FormService) { 
        this.frm = data;
        console.log('data1------>',this.frm);
    }

  ngOnInit() {
  }
  
  
//  onSubmit(){
//      console.log("createe for called formtype=",this.formTypeId," form title=",this.frmTitle);
//      this.frm.type=this.formTypeId+"";
//      this.frm.title=this.frmTitle;
//      this.frm.name=this.frmTitle;
//      this.frm.publishtimezone=this.frmSrv.getClientTimezone();
//      this.frm.createdDate=new Date();
//      
//      console.log("frm==",this.frm);
//      this.frmSrv.saveForm(this.frm, "")
//      .subscribe(response=>{
//       
//         this.frmSrv.showNotification('top','center','Form created successfully','s');
//          console.log("In form componenet form link0 is ",response);
//      });
      
//  }
  

}
