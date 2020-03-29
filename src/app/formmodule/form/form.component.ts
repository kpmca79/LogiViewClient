import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common'; 
import {PlatformLocation } from '@angular/common';

import { FormField } from '../../model/FormField';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem  } from '@angular/cdk/drag-drop';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { FormService } from '../../services/form.service';
import { ElementPropDialogComponent } from '../element-prop-dialog/element-prop-dialog.component';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Form } from "../../model/Form";
import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeStyle } from '@angular/platform-browser';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as InlineEditor from '@ckeditor/ckeditor5-build-inline';
import { MessagingService } from "../../services/messaging.service";
import {ViewEncapsulation} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SubField } from "app/model/SubField";


declare var $: any;
//declare var $: JQueryStatic;


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css']
})
export class FormComponent implements OnInit {
  @Input() formField: FormField[];
  @Input() frm:Form; 
  @Input() formID:String; 
  formTitle="sample form";
  public editor= InlineEditor;
  theme:String ="light-theme";
  currentRate=3;
  durationInSeconds=3;
  hours=['',1,2,3,4,5,6,7,8,9,10,11,12];
  minutes=[''];
  meridiem=['','AM','PM'];
  cssURL="/api/file/form-customization.css";
//  cssURL="./assets/css/form-customization.css";
  passURL:any;
//  $: any;
  emailFormControl = new FormControl('', [Validators.required]);
  
   
  constructor(iconRegistry: MatIconRegistry, 
              private sanitizer: DomSanitizer,
              platformLocation: PlatformLocation, 
              private location: Location, 
              private _sanitizer: DomSanitizer,
              private frmSrv: FormService, 
              public dialog: MatDialog, 
              private mService: MessagingService,
              private snackBar:MatSnackBar) 
  {      // console.log((platformLocation as any).location);
      iconRegistry.addSvgIcon(
              'Setting',
              sanitizer.bypassSecurityTrustResourceUrl('assets/icon/setting.svg'));
      iconRegistry.addSvgIcon(
              'Delete',
              sanitizer.bypassSecurityTrustResourceUrl('assets/icon/delete.svg'));
              iconRegistry.addSvgIcon(
              'Morevert',
              sanitizer.bypassSecurityTrustResourceUrl('assets/icon/morevert.svg'));
              
              this.passURL=sanitizer.bypassSecurityTrustResourceUrl(this.cssURL);
              
              this.mService.consume().subscribe((m:any) => 
              {
                  console.log("message got inside form",m);
                  this.reactOnMessage(m);
              })
              
      
  }
//  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
//      alert(`Old Value:${$event.oldValue}, 
//        New Value: ${$event.newValue}, 
//        Checked Color: ${$event.starRating.checkedcolor}, 
//        Unchecked Color: ${$event.starRating.uncheckedcolor}`);
//    }
  reactOnMessage(msg:any)
  {
      let log="Inside Form.component->reactOnMessage() "
      console.log("form method triggered : "+msg);
      console.log("Change required: ",msg.opacity);
      if(this.frm)
      {
          if(msg.opacity || msg.opacity==0)
          {
              this.frm.opacity=msg.opacity;
          }
          if(msg.width || msg.width==0)
          {
              this.frm.formwidth=msg.width;
          }
          if(msg.fileID)
          {
              console.log(log,"InsImage change fileid=",msg.fileID)
              this.frm.bgImage=msg.fileID;
          }
          if(msg.frmStyle)
          {
              this.frm.style=msg.frmStyle;
          }
          if(msg.frmbtnStyle)
          {
              this.frm.btnStyle=msg.frmbtnStyle;
          }
          if(msg.theme)
              this.frm.theme="light-theme";
          else
              this.frm.theme="dark-theme";
      }
      else
          console.log("ERROR FORM NOT FOUND!!!!!!!!!");
//      if(msg.elementadd)
//          this.saveForm(false);
      
  }

  ngOnInit() {
      let url:any
      console.log('ck editor toolbar test',this.editor.config);
     
      for(var i=0;i<60;i=i+10){this.minutes.push(i+'');}
      
      if(this.frm && this.formID)
      {
          
//          const formObsrv= this.frmSrv.viewForm(this.formID).subscribe(
//                  response=>this.frm=response.data);
//          console.log("formid got=",this.formID)
          console.log("HHHHHHHHHHEY RAJIIIIIIIIIII",this.formField);
          
                      
      }
      else
      {
          console.log("do not get formid="+this.formID)
          this.frm={ id: '',name: '',type:'form',title: 'Sample form',path: 'sample',
                  status: 'Active',bgColor: '#ffffff',bgImage: '',header: '',
                  footer: '',theme:'',formFields:[], _links:'',opacity:0,
                  response:0,
                  thanksdata: 'Thanks You, you have successfully submitted your response, you might get email confirmation for the same.',
                  thankstype: 'message',
                  formwidth:  600,      
                  publishdate: null,
          publishtime: "00:00",
          publishtimezone: "GMT +5:30",
          publishstatus: "",
          publishuptodate: null,
          publishuptotime: "",
          visibility: "Public",
          publishnow: false,
          createdDate: null,
          style:"",
          btnStyle:"",
          };
      }
  
 

  }

  public remove(field)
    {
        
         var index =  this.formField.indexOf(field);
            this.formField.splice(index, 1);  
//            this.saveForm(false);
    }
   

     showSetting( field: FormField) {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          dialogConfig.width='760px';
          dialogConfig.height='800px';
          console.log("Inside show setting field is ",field)
//          console.log('121212--->',field.color);
          if(!field.fname || field.fname=='')
              field.fname=field.name;
              dialogConfig.data =field;
              dialogConfig.data.id=1;
              dialogConfig.data.height='1000px';
              dialogConfig.data.width='600px';
              console.log("opening dialog with config data------>",dialogConfig.data);
              const dialogRef = this.dialog.open(ElementPropDialogComponent, dialogConfig);
              dialogRef.afterClosed().
              subscribe(result => {
                                     if (result) {
                                         field=dialogConfig.data;
                                         this.updateFrmControl(field);
                                         console.log("after cloe dialog with config data------>",dialogConfig.data);
                                   }});
     }
     
     updateFrmControl(field:FormField)
     {
       
         console.log("Enter updateFrmControl field--->",field);
         let vl=[];
         if(field.required)
             vl.push(Validators.required);
         if(field.selectedValidation=='Email')
             vl.push(Validators.email);
         if(field.maxlen!=0)
             vl.push(Validators.maxLength(field.maxlen));
         if(field.minlen!=0)
             vl.push(Validators.minLength(field.minlen));
         field.frmControl = new FormControl('', vl);
         console.log("Exit updateFrmControl field--->",field);
//         this.saveForm(false);
         
     }
     sanitize(image) {
         return this._sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(29, 29, 29, 0), rgba(16, 16, 23, 0.5)), url(${image})`);
     }
     sanitizeHTML(style:string): SafeStyle {
         return this._sanitizer.bypassSecurityTrustStyle(style);
     }
     
     saveForm(showNotification:boolean)
     {
          let strFields: FormField[] =[];
        if(this.formField){
                this.formField.forEach(val=>{
                if(val.id) val.id=null;
                if(val.frmControl)val.frmControl=null;
            }); }
          const saveFormObj =  this.frmSrv.saveForm(this.frm,this.formID)
          .subscribe(response=>{
              this.formID=response.data;
              if(showNotification)
                  this.showNotification('top','center','Form saved successfully','s');
              console.log("Form saved successfully---> ",this.formID);});
       
     }
     showNotification(from, align,msg,msgType){
         
         const type = ['','info','success','warning','danger'];
         
         let color = Math.floor((Math.random() * 4) + 1);
         if(msgType=='s')
             {
                 color = 2;
             }

         $.notify({
             icon: "notifications",
             message: msg

         },{
             type: type[color],
             timer: 100,
             delay:1000,
             placement: {
                 from: from,
                 align: align
             },
             template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
               '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
               '<i class="material-icons" data-notify="icon">notifications</i> ' +
               '<span data-notify="title">{1}</span> ' +
               '<span data-notify="message">{2}</span>' +
               '<div class="progress" data-notify="progressbar">' +
                 '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
               '</div>' +
               '<a href="{3}" target="{4}" data-notify="url"></a>' +
             '</div>'
         });
     }
     previewForm()
     {
        
     }
     
     
     addEvent(type: string, event: MatDatepickerInputEvent<Date>) 
     {
         console.log('datedaete-->',event.value)
//             this.events.push(`${type}: ${event.value}`);
         
     }
     drop(event: CdkDragDrop<FormField[]>) {
         moveItemInArray(this.formField, event.previousIndex, event.currentIndex);
       }
     
     onFileComplete(data: any) {
         console.log("File uploaded successfully got data=",data); // We just print out data bubbled up from event emitter.
   }

}

