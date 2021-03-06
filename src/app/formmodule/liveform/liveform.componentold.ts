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
    resourceURL = "/api/file/";
    bgURL;
    theme = "theme";
    safeBgURL;
    publicIPAddr: string;
    respJson: any = {};
    hours = ['', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    minutes = [''];
    meridiem = ['', 'AM', 'PM'];
    files = [];
    currentRate = 3;

    constructor( private route: ActivatedRoute,
        private frmSrv: FormService,
        private sanitizer: DomSanitizer,
        private datePipe: DatePipe,
        private router: Router ) { }
    sanitizeHTML( style: string ): SafeStyle {
        return this.sanitizer.bypassSecurityTrustStyle( style );
    }
    onFileComplete( data: any ) {
        var fileJson = JSON.parse( data );
        console.log( data )
        console.log( fileJson.id );
        console.log( fileJson.name );
        console.log( fileJson.type );
        console.log( fileJson.fieldName );
        this.frm.formFields.forEach( field => {
            if ( field.type == 'upload' ) {
                if ( field.name == fileJson.fieldName ) {
                    if ( !field.submitValue )
                        field.submitValue = "";
                    field.submitValue = field.submitValue + "<a href='" + "http://localhost:8080/api/file/" + fileJson.id + "'>" + fileJson.name + "</a><br/>";
                }

            }
        } )
        console.log( "After changes fields are ", this.frm.formFields );


    }
    ngOnInit() {
        console.log( "Enter into liveform component-->init()" )
        for ( var i = 0; i < 60; i = i + 10 ) { this.minutes.push( i + '' ); }
        this.formID = this.route.snapshot.paramMap.get( "id" );
        console.log( "formid is =", this.formID );
        const formObsrv = this.frmSrv.viewForm( this.formID ).subscribe(
            response => {
                this.frm = response.data;
                this.formField = this.frm.formFields;
                if ( this.frm.formwidth == 0 )
                    this.frm.formwidth = 600;
                if ( this.frm.bgImage ) {
                    this.bgURL = "url(" + this.resourceURL + this.frm.bgImage + ")";
                    this.safeBgURL = this.sanitizer.bypassSecurityTrustStyle( this.bgURL );
                }
                console.log( "Form fileds" );
//                this.addFieldValidations();
                if ( this.frm.opacity ) {
                    let myDiv = document.getElementById( 'form' );
                    myDiv.style.opacity = ( 1 - ( this.frm.opacity / 100 ) ).toPrecision( 2 );
                }


            }
        );
        this.getPublicIP();


    }
  
    onSubmit() {
        console.log( "inside submit" )
        let isError: boolean = false;
        console.log( "Today new==>", this.formField )

        this.formField.forEach( field => {
            if ( field.frmControl.invalid ) {
                isError = true;
                console.log( field.frmControl.invalid );
                return;
            }
            if ( field.subfields ) {
                field.subfields.forEach( subfield => {

                    if ( subfield.frmControl && subfield.frmControl.invalid ) {
                        isError = true;
                        console.log( subfield.frmControl.invalid );
                        return;
                    }
                } )
            }
        } )


        if ( !isError ) {
            this.respJson.formID = this.formID;
            this.respJson.IpAddress = this.publicIPAddr;
            this.respJson.resTime = this.datePipe.transform( new Date(), 'dd-MM-yyyy HH:mm:ss zzzz' );
            this.formField.forEach( field => {

                if ( field.type != "section" && field.type != "submit" ) {

                    let value = field.frmControl.value
                    if ( field.type == "date-picker" )
                        value = this.datePipe.transform( value, 'dd-MM-yyyy HH:mm:ss zzzz' );
                    //                 if(field.fname)
                    //                     this.respJson[field.fname]=value;

                    else if ( field.type == "fullname" ) {
                        if ( field.subfields ) {
                            field.subfields.forEach( subfield => {
                                if ( subfield.visible ) {
                                    this.respJson[subfield.name] = subfield.frmControl.value;
                                }
                            } );
                        }
                    }
                    else if ( field.type == "address" ) {
                        if ( field.subfields ) {
                            field.subfields.forEach( subfield => {
                                if ( subfield.visible ) {
                                    this.respJson[subfield.name] = subfield.frmControl.value;
                                }
                            } );
                        }

                    }
                    else if ( field.type == "time" ) {
                        if ( field.subfields ) {
                            let selTime = '';
                            selTime = field.subfields[0].frmControl.value; //hour
                            selTime = selTime + ":" + field.subfields[1].frmControl.value //min
                            selTime = selTime + " " + field.subfields[2].frmControl.value //am/pm
                            this.respJson[field.fname] = selTime;
                        }
                    }
                    else if ( field.type == "phone" ) {
                        if ( field.subfields ) {
                            let phone = '';
                            phone = field.subfields[0].frmControl.value; //hour
                            phone = phone + "-" + field.subfields[1].frmControl.value //prefix
                            this.respJson[field.fname] = phone;
                        }
                    }
                    else if ( field.type == "upload" ) {
                        if ( field.submitValue ) {

                            this.respJson[field.name] = field.submitValue;
                        }
                    }
                    if ( field.type == "rating" ) {
                        this.respJson[field.name] = this.currentRate;
                    }
                    else if ( field.fname )
                        this.respJson[field.fname] = value;

                }
            } )

            console.log( "todaynew1111", this.respJson );
            const formObj = this.frmSrv.saveResponse( this.formID, this.respJson ).subscribe(
                data => {
                    console.log( data )
                    this.router.navigate( ["/form/" + this.formID + "/thanks"] );
                },
                error => { console.log( error ); return; } )
        }
    }
    getPublicIP() {
        const ipObservable = this.frmSrv.getPublicIP().subscribe( data => {
            let result: any = data;
            this.publicIPAddr = result.ip;
            this.frmSrv.getIPDetail( this.publicIPAddr ).subscribe(
                data1 => {
                    console.log( "IP details", data1 )
                    this.respJson.resp_country = data1.country_name;
                    this.respJson.resp_state = data1.region;
                    this.respJson.resp_city = data1.city;
                    this.respJson.latitude = data1.latitude;
                    this.respJson.longitude = data1.longitude;
                    this.respJson.offset = data1.offset;



                },
                err1 => { console.log( "IP details", err1 ) } );
        }, ( err ) => {
            console.log( "IP error ", err );
            this.publicIPAddr = "IP not found"
        } )

    }


    addEvent( type: string, event: MatDatepickerInputEvent<Date> ) {
        console.log( 'datedaete-->', event.value )
        //          this.events.push(`${type}: ${event.value}`);

    }

}
