import { Component, OnInit } from '@angular/core';
import { PlatformLocation } from "@angular/common";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { FormService } from "../../services/form.service";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { Form } from "../../model/Form";
import { FormField } from "../../model/FormField";
import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";

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
  preview="preview";
  hours=['',1,2,3,4,5,6,7,8,9,10,11,12];
  minutes=[''];
  meridiem=['','AM','PM'];
  
  constructor(private route: ActivatedRoute,
              private frmSrv: FormService,
              private sanitizer: DomSanitizer,
              
          ) 
  { 
      
  }
  sanitizeHTML(style:string): SafeStyle {
      return this.sanitizer.bypassSecurityTrustStyle(style);
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
                  console.log(this.frm.bgColor);
                  if ( this.frm.bgImage ) {
                      this.bgURL = "url(" + this.resourceURL + this.frm.bgImage + ")";
                      this.safeBgURL = this.sanitizer.bypassSecurityTrustStyle( this.bgURL );
                  }
                  this.formField.forEach(field=>
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
                  if(this.frm.opacity)
                  {
                      let myDiv = document.getElementById('form');
                      myDiv.style.opacity = (1-(this.frm.opacity/100)).toPrecision(2);
                  }
                  
                  
              }
      );
      
  }

}
