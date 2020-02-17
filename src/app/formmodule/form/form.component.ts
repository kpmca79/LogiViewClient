import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common'; 
import {PlatformLocation } from '@angular/common';

import { FormField } from '../../model/FormField';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem  } from '@angular/cdk/drag-drop';
import { MatDialogConfig, MatDialog, MatDatepickerInputEvent, MatIconRegistry } from '@angular/material';
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
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input() formField: FormField[];
  @Input() frm:Form; 
  @Input() formID:String; 
  formTitle="sample form";
  public editor= InlineEditor;
  theme:String ="light-theme";
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
          if(msg.theme)
              this.frm.theme="light-theme";
          else
              this.frm.theme="dark-theme";
      }
      else
          console.log("ERROR FORM NOT FOUND!!!!!!!!!");
      
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
          };
      }
  
 

  }

  public remove(field)
    {
        
         var index =  this.formField.indexOf(field);
            this.formField.splice(index, 1);     
    }
   

     showSetting( field: FormField) {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          dialogConfig.width='760px';
          dialogConfig.height='800px';
          console.log('121212--->',field.color);
          
          dialogConfig.data = {
                                    id: 1,
                                    fname: field.fname,
                                    message:field.message,
                                    title: field.title,
                                    options: field.options,
                                    validation: field.validation,
                                    required: field.required,
                                    type: field.type,
                                    minlen:field.minlen,
                                    maxlen:field.maxlen,
                                    frmtitle:field.title,
                                    frmstatus:field.status,
                                    selectedValidations:field.selectedValidation,
                                    color: field.color,
                                    selectedColor: field.selectedColor,
                                    disabled:field.disabled,
                                    checked: field.checked,
                                    mindate: field.mindate,
                                    maxdate: field.maxdate,
                                    selectedDate:field.selectedDate,
                                    height: '1000px',
                                    width: '600px',
                                    subfield:field.subfields
                                 };
        

            const dialogRef = this.dialog.open(ElementPropDialogComponent, dialogConfig);
            dialogRef.afterClosed().subscribe(result => {
                                                             if (result) {
                                                                            
                                                                       field.title=dialogConfig.data.title;
                                                                       this.saveLocalData(dialogConfig.data,field);
                                                                       console.log("777777777777--->",dialogConfig.data);


                                                                    }
                                                });
     }
     
     saveLocalData(data,field:FormField)
     {
         field.title=data.title;
         field.fname=data.fname;
         field.message=data.message;
         field.options=data.options;
         field.required=data.required;
         field.maxlen=data.maxlen;
         field.minlen=data.minlen;
         field.status=data.frmstatus;
         field.selectedValidation=data.selectedValidations;
         field.selectedColor=data.selectedColor;
         field.color=data.color;
         field.checked=data.checked;
         field.disabled=data.disabled;
         field.mindate=data.mindate;
         field.maxdate=data.maxdate;
         field.subfields=data.subfield
         console.log("$$$$$$$$3#######--->",field);
//         console.log('888888888---->',field.maxlen,field.minlen);
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
      
         console.log('title=',field.title,'options=',field.options,'required=',field.required,'validation=',data.selectedValidations);
     }
     sanitize(image) {
         return this._sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(29, 29, 29, 0), rgba(16, 16, 23, 0.5)), url(${image})`);
     }
     sanitizeHTML(style:string): SafeStyle {
         return this._sanitizer.bypassSecurityTrustStyle(style);
     }
     
     saveForm()
     {
          let strFields: FormField[] =[];
//         this.frm.formFields.forEach(field=>strFields.push[JSON.stringify(field)])
    
     this.formField.forEach(val=>
         {
             
             let fld= new FormField(); 
            
             fld.title=val.title;
             fld.status=val.status 
             fld.name=val.name;
             fld.fname=val.fname;
             fld.message=val.message;
             fld.required=val.required;
             fld.validation=val.validation;
             fld.options=val.options;
             fld.maxlen=val.maxlen;
             fld.minlen=val.minlen;
             fld.selectedOption=val.selectedOption;
             fld.selectedValidation=val.selectedValidation;
             fld.innerHtml=val.innerHtml;
             fld.selectedColor=val.selectedColor;
             fld.color=val.color;
             fld.checked=val.checked;
             fld.disabled=val.disabled;
             fld.type=val.type;
             fld.frmControl=null;
             fld.id=null;
             fld.subfields=val.subfields;
             strFields.push(fld);
         }
         
     ); 
     this.frm.formFields=strFields;
//     this.frm.formFields.forEach(field=>console.log(JSON.stringify(field)));
//     console.log('you are in save form',this.frm);
         
  
     const saveFormObj =  this.frmSrv.saveForm(this.frm,this.formID)
     .subscribe(response=>{
         this.formID=response.data;
       this.showNotification('top','center','Form saved successfully','s');
         console.log("In form componenet form link0 is ",this.formID);
     });
       
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

}

