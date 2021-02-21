import { Component, OnInit } from '@angular/core';
import { PlatformLocation } from "@angular/common";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { FormService } from "../../services/form.service";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Form } from "../../model/Form";
import { FormField } from "../../model/FormField";
import { Validators } from "@angular/forms";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { FormResponse } from "../../model/FormResponse";
import { ResponseEntry } from "../../model/ResponseEntry";
import { DatePipe } from "@angular/common";




@Component( {
    selector: 'app-liveform',
    templateUrl: './liveform.component.html',
    styleUrls: ['./liveform.component.css']
} )
export class LiveformComponent implements OnInit {
    public formID: String;
    frm: Form;
    formField: FormField[];
    bgURL;
    theme = "theme";
    safeBgURL;
    live="live";
    bgStyle='';
    deviceInfo:any;
    resourceURL = "/api/file/";
    constructor( private route: ActivatedRoute,
        private frmSrv: FormService,
        private sanitizer: DomSanitizer,
        private datePipe: DatePipe,
        private router: Router ) { }
    sanitizeHTML( style: string ): SafeStyle {
        return this.sanitizer.bypassSecurityTrustStyle( style );
    }
    
    ngOnInit() {
        this.formID = this.route.snapshot.paramMap.get( "id" );
        console.log( "formid is =", this.formID );
        const formObsrv = this.frmSrv.viewForm( this.formID ).subscribe(
            response => {
                this.frm = response.data;
                this.formField = this.frm.formFields;
                if ( this.frm.bgImage != null && this.frm.bgImage != '' )
                    this.bgStyle = this.bgStyle + "background-image: url('" + this.resourceURL + this.frm.bgImage + "');";
                else if(this.frm.pageBGColor && this.frm.pageBGColor!='')
                    this.bgStyle = this.bgStyle + "background:" + this.frm.pageBGColor+";";
        
            }
        );

    }
    
}
