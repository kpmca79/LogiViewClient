import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common'; 
import {PlatformLocation } from '@angular/common';
import { FormField } from '../../model/FormField';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem  } from '@angular/cdk/drag-drop';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { FormService } from '../../services/form.service';
import { MessagingService } from '../../services/messaging.service';
import { ActivatedRoute } from "@angular/router";
// import { ElementPropDialogComponent } from '../element-prop-dialog/element-prop-dialog.component';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Form } from "../../model/Form";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import {ViewEncapsulation} from '@angular/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }}

@Component({
  selector: 'builder',
  templateUrl: 'form-builder.component.html',
  styleUrls: ['form-builder.component.scss']
})

export class FormBuilderComponent implements OnInit {
 
    public formID: String; 
frm: Form;
showRightNav: false;
type="form";
[x: string]: any;
title = 'DragDrop';
students: FormField[] = [];
students2: FormField[] = [];
html: String;
std: FormField;
tempVal2;
titlemsg = 'form builder demo';
opened: boolean =true;
notopened: boolean = true;
showformProper=false;
chgEvent:any = {"elementadd":false};
bgImageID="5ccd9b901fd9be0ae8f74ead";
resourceURL="/api/file/";
//bgURL="url(http://localhost:8085/api/1/file/5ccd9b901fd9be0ae8f74ead)";
bgURL="url(https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)";
bgURLDirect=null;
safeBgURL;

constructor(iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer,private route: ActivatedRoute,
      private stdSrv: FormService, public dialog: MatDialog, private mService: MessagingService
      )
{ 
  iconRegistry.addSvgIcon(
          'TextField',
          sanitizer.bypassSecurityTrustResourceUrl('assets/icon/textfield.svg'));
  iconRegistry.addSvgIcon(
          'Section',
          sanitizer.bypassSecurityTrustResourceUrl('assets/icon/section.svg'));
  iconRegistry.addSvgIcon(
          'Toggle',
          sanitizer.bypassSecurityTrustResourceUrl('assets/icon/toggle.svg'));
  iconRegistry.addSvgIcon(
          'TextArea',
          sanitizer.bypassSecurityTrustResourceUrl('assets/icon/textarea.svg'));
  iconRegistry.addSvgIcon(
          'Dropdown',
          sanitizer.bypassSecurityTrustResourceUrl('assets/icon/dropdown.svg'));
  iconRegistry.addSvgIcon(
          'Datepicker',
          sanitizer.bypassSecurityTrustResourceUrl('assets/icon/datepicker.svg'));
  iconRegistry.addSvgIcon(
          'Touch',
          sanitizer.bypassSecurityTrustResourceUrl('assets/icon/touch.svg'));
  iconRegistry.addSvgIcon(
          'Add',
          sanitizer.bypassSecurityTrustResourceUrl('assets/icon/add.svg'));
  iconRegistry.addSvgIcon(
          'Close',
  sanitizer.bypassSecurityTrustResourceUrl('assets/icon/close.svg'));
  iconRegistry.addSvgIcon(
          'Paint',
  sanitizer.bypassSecurityTrustResourceUrl('assets/icon/paint.svg'));
  iconRegistry.addSvgIcon(
          'Home',
  sanitizer.bypassSecurityTrustResourceUrl('assets/icon/home.svg'));
  
  iconRegistry.addSvgIcon(
          'Preview',
  sanitizer.bypassSecurityTrustResourceUrl('assets/icon/preview.svg'));
  
  this.mService.consume().subscribe((m:any) => 
  {
//      console.log("message got inside form",m);
      this.reactOnMessage(m);
  })
}
reactOnMessage(event:any)
{
  console.log("********************builder method triggered : "+event);
  if(event.safeBgURL)
  {
      this.safeBgURL=event.safeBgURL;
      this.bgURLDirect=event.safeBgURL
  }
//  console.log("11111 Opacity : "+event.opacity);
//  console.log("11111 calval : "+(1-(event.opacity/100)).toPrecision(2));
  if(event.opacity)
  {
      let myDiv = document.getElementById('form');
      myDiv.style.opacity = (1-(event.opacity/100)).toPrecision(2);
  }
  if(event.width)
  {
      let myDiv = document.getElementById('form');
      myDiv.style.maxWidth = event.width+"px";
  }
  if(event.opacity==0)
  {
      let myDiv = document.getElementById('form');
      myDiv.style.opacity = "1";
  }
}


ngOnInit() {
  this.formID = this.route.snapshot.paramMap.get("id");
  if(!this.formID)
  {
      this.formID="5cbf6b83722e3e0ea407271a";
//      console.log("form id not found");
  }
  
console.log("formid is =", this.formID);

  if(this.formID)
  {
          const formObsrv= this.stdSrv.viewForm(this.formID).subscribe(
                  response=>{
                      console.log(response);
                      this.frm=response.data;
                      if(this.frm.formFields)
                          this.students2=this.frm.formFields;
                      console.log("Today........",this.students2);
//                      console.log(this.frm.bgColor);
                      this.students2.forEach(field=>
                      {
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
                      });
//                      console.log("hello I am in1dise"+response);
//                      console.log("hello I am ind4ise"+this.frm.bgImage);
                      if(this.frm.bgImage)
                          this.bgURL="url("+this.resourceURL+this.frm.bgImage+")";
                      this.bgURLDirect=this.resourceURL+this.frm.bgImage;
//                      console.log("hello I am444 ind4ise"+this.bgURL);
                      this.safeBgURL = this.sanitizer.bypassSecurityTrustStyle(this.bgURL);
                      if(this.frm.opacity)
                      {
//                          console.log("hello I am5555 ind4ise"+this.frm.opacity);
                          document.getElementById('form').style.opacity= (1-(this.frm.opacity/100)).toPrecision(2);
                      }
//                      else
//                          console.log("hello I am5543543535 ind4ise"+this.frm.opacity);
                  }
                      
          );
  }
//  this.bgURL="url(http://localhost:8085/api/1/file/"+this.frm.bgImage+")";
  
 
 
  
  const studentsObservable = this.stdSrv.getFields();
  studentsObservable.subscribe(data => {
     console.log("form fields =======",data)
      let x= data
      this.students = x.data;
     console.log("form fields array =======",data)
     
  });
}

ChangeBackground(event)
{
//  console.log("background changed");
//  console.log(this.safeBgURL);
  this.safeBgURL=event.safeBgURL;
  this.bgURLDirect=event.safeBgURL;
//  console.log(this.safeBgURL);
//  console.log(event.opacity);
//  console.log("setting opacity to ",(event.opacity/100).toPrecision(2));
  let myDiv = document.getElementById('form');
  myDiv.style.opacity = (1-(event.opacity/100)).toPrecision(2); 
}

drop(event: CdkDragDrop<string[]>) {
  if (event.previousContainer === event.container) {
//     console.log(event.previousIndex + '   ' + event.currentIndex);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
//      console.log(event.container.data);
      
  } else {
      const tempVal2:any = event.previousContainer.data[event.previousIndex]; 
      let std : FormField = new FormField();
      std=JSON.parse(JSON.stringify(tempVal2)) as FormField; 
      std.selectedOption ='option1';
      std.frmControl=new FormControl('', []); ;
      console.log("TTTTTTTOOOOOOOOOOOT ",std);
      this.students2.push(std);
      
      this.chgEvent.elementadd=false;
      this.chgEvent.elementadd=true;
//      this.mService.produce(this.chgEvent);
      this.chgEvent.elementadd=false;
      this.changeorder();
  }
}
changeorder()
{
    let submitIndex=this.students2.findIndex(fld=>fld.type==="submit");
    console.log("submit index is ",submitIndex);
    console.log("mew element index is  ",this.students2.length-1);
    let tmp = this.students2[submitIndex];
    this.students2[submitIndex]=this.students2[this.students2.length-1];
    this.students2[this.students2.length-1]=tmp;
    
    
}

showleftpane()
{
  this.notopened = ! this.notopened;
  this.opened = ! this.opened;
  
  
}
openleft()
{
   console.log("@@@@@@@@@@ left nave open call")
    this.opened=true;
}
showFormProp()
{
  this.showformProper=!this.showformProper;
  if(this.showformProper)
      this.notopened = false;
  else
      this.notopened = true;
//  this.showleftpane();
}
cleanURL(): SafeUrl {
  return   this.sanitizer.bypassSecurityTrustResourceUrl(this.bgURL);
  }

}

