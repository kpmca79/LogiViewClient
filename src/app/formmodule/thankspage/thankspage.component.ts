import { Component, OnInit } from '@angular/core';
import { PlatformLocation } from "@angular/common";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { FormService } from "../../services/form.service";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { Form } from "../../model/Form";
import { FormField } from "../../model/FormField";
import { Validators } from "@angular/forms";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { FormResponse } from "../../model/FormResponse";
import { ResponseEntry } from "../../model/ResponseEntry";
import { DatePipe } from "@angular/common";


@Component({
  selector: 'app-thankspage',
  templateUrl: './thankspage.component.html',
  styleUrls: ['./thankspage.component.scss']
})
export class ThankspageComponent implements OnInit {
    public formID: String;  
    frm: Form;
    formField: FormField[];
    resourceURL="/api/file/";
    bgURL;
    safeBgURL;
    bgStyle='';
    publicIPAddr:string;
  constructor(private route: ActivatedRoute,
          private frmSrv: FormService,
          private sanitizer: DomSanitizer,
          private datePipe: DatePipe) { }
  sanitizeHTML(style:string): SafeStyle {
      return this.sanitizer.bypassSecurityTrustStyle(style);
  }

  ngOnInit() {
      this.formID = this.route.snapshot.paramMap.get("id");
      console.log("formid is =", this.formID);
      const formObsrv= this.frmSrv.viewForm(this.formID).subscribe(
              response=>{
                  this.frm=response.data;
                  console.log(this.frm);
                  this.formField=this.frm.formFields;
                  console.log(this.frm.bgColor);
                  console.log("new form details")
                  console.log("===================")
                  console.log(this.frm.thankstype);
                  console.log(this.frm.thanksdata);
                  console.log(this.frm.formwidth);
                  if(this.frm.formwidth==0)
                      this.frm.formwidth=600;
                  console.log("===================")
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
                  /*if(this.frm.opacity)
                  {
                      let myDiv = document.getElementById('form');
                      myDiv.style.opacity = (1-(this.frm.opacity/100)).toPrecision(2);
                  }*/
                  if ( this.frm.bgImage != null && this.frm.bgImage != '' )
                    this.bgStyle = this.bgStyle + "background-image: url('" + this.resourceURL + this.frm.bgImage + "');";
                  else if(this.frm.pageBGColor && this.frm.pageBGColor!='')
                    this.bgStyle = this.bgStyle + "background:" + this.frm.pageBGColor+";";
                  
                  
              }
      );
      
  }

}
