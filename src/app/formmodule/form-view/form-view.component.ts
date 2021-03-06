import { Component, OnInit, ViewChild } from '@angular/core';
import { PlatformLocation } from "@angular/common";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { FormService } from "../../services/form.service";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { Form } from "../../model/Form";
import { FormField } from "../../model/FormField";
import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css']
})
export class FormViewComponent implements OnInit {

  public formID: String;  
  frm: Form;
  formField: FormField[];
  resourceURL="/api/file/";
  bgURL;
  safeBgURL;
  currentRate=3;
  preview="preview";
  bgStyle='';
  hours=['',1,2,3,4,5,6,7,8,9,10,11,12];
  minutes=[''];
  meridiem=['','AM','PM'];
  @ViewChild(FormComponent) form:FormComponent;
  
  constructor(private route: ActivatedRoute,
              private frmSrv: FormService,
              private sanitizer: DomSanitizer,
              
          ) 
  { 
      
  }
  currentFields:FormField[]=[]
  
 
  sanitizeHTML(style:string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }
  onFileComplete(data: any) {
      console.log(data); // We just print out data bubbled up from event emitter.
}
  ngOnInit() {
      for(var i=0;i<60;i=i+10){this.minutes.push(i+'');}
      this.formID = this.route.snapshot.paramMap.get("id");
      console.log("formid is =", this.formID);
      const formObsrv= this.frmSrv.viewForm(this.formID).subscribe(
              response=>{
                  this.frm=response.data;
                  console.log(this.frm);
                  this.formField=this.frm.formFields;
                  this.currentFields=this.frm.pages[0].pageFields;
                  console.log(this.frm.bgColor);
                  if ( this.frm.bgImage ) {
                      this.bgURL = "url(" + this.resourceURL + this.frm.bgImage + ")";
                      this.safeBgURL = this.sanitizer.bypassSecurityTrustStyle( this.bgURL );
                  }
                  if ( this.frm.bgImage != null && this.frm.bgImage != '' )
                    this.bgStyle = this.bgStyle + "background-image: url('" + this.resourceURL + this.frm.bgImage + "');";
                  else if(this.frm.pageBGColor && this.frm.pageBGColor!='')
                    this.bgStyle = this.bgStyle + "background:" + this.frm.pageBGColor+";";
                  console.log("FSADDDDDDDDDDDDDD---->",this.bgStyle);
                  
              }
      );
      
  }
  addValidators(pageFields:FormField[]){
    pageFields.forEach(field=>
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
          if(field.type=='number')
          {
              vl.push(Validators.pattern("^[0-9]*$"));
              vl.push(Validators.max(field.maxlen));
              vl.push(Validators.min(field.minlen));
              
          }
          field.frmControl = new FormControl('', vl);
      });
  }

}
