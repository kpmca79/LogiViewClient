import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { PlatformLocation, DatePipe } from '@angular/common';

import { FormField } from '../../model/FormField';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { FormService } from '../../services/form.service';
import { ElementPropDialogComponent } from '../element-prop-dialog/element-prop-dialog.component';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Form } from "../../model/Form";
import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeStyle } from '@angular/platform-browser';
import { MessagingService } from "../../services/messaging.service";
import { ViewEncapsulation, HostBinding, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubField } from "app/model/SubField";
import { PerfectScrollbarConfigInterface,PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { ActivatedRoute,Router } from "@angular/router";
import { Observable, Observer } from "rxjs";
//import * as $ from 'jquery';
import { PaymentDetail } from "app/model/PaymentDetail";
import Utils from "app/util/utils";
import { DeviceDetectorService } from 'ngx-device-detector';

//payUMoney bold object
declare const bolt:any;
declare var $: any;


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState( control: FormControl | null, form: FormGroupDirective | NgForm | null ): boolean {
        const isSubmitted = form && form.submitted;
        return !!( control && control.invalid && ( control.dirty || control.touched || isSubmitted ) );
    }
}

@Component( {
    selector: 'app-form',
    templateUrl: 'form.component.html',
    styleUrls: ['form.component.css']
} )

export class FormComponent implements OnInit {
    @Input() inputPageFields: FormField[];
    @Input() frm: Form;
    @Input() formID: String;
    @Input() mode:string;
    @Input() pageNo:number;
    currentPageNo=0;
    saveResponseLoader=false;
    surl="https://localhost:4200/form/";
    furl="https://localhost:4200/login";
    ipDetailsURL='https://json.geoiplookup.io';
    isPaymentForm=false;
    isPaymentSuceess=false;
    captchav2SiteKey="6LfMx64ZAAAAACQ6nRCglIwPacx3AraqI7vLBFSB";
    isBuild=false;
    isLive=false;
    finalPaymentDetail:PaymentDetail;
    dummyController:any;
    public config: PerfectScrollbarConfigInterface = {};
    inputStyle="standard";
//    inputStyle="outline";
//    inputStyle="";
    formTitle = "sample form";
    
    theme: String = "light-theme";
    excludeFieldTypes=['submit','section','next','prevsubmit','prevnext'];
    currentRate = 3;
    durationInSeconds = 3;
    compBGColor = "#4d4d4d"//"#ccc97e";
    compColor = '#ff5900';
    compStyle = "background:" + this.compBGColor + ";color:" + this.compColor + ";";
    hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    minutes = [];
    meridiem = ['AM', 'PM'];
    fileUploadURL="/api/file";
    imgURL = "/api/file/"
    cssURL = "/api/file/form-customization.css";
    //  cssURL="./assets/css/form-customization.css";
    passURL: any;
    calOpen: boolean;
    //  $: any;
    emailFormControl = new FormControl( '', [Validators.email] );
    bgStyle = '';
    
    cardFormStyle=""
    drpDownBGColor;
    drpDownFontColor;
    publicIPAddr='Not found';
    respJson: any = {};
    signatureImage;
    $event;
    buttonFiled:FormField;
    inputbordercolor="initial";
    inputbordercolorfocus="initial";
    inputfontcolor="initial";
    compcolor="initial";
    compbgcolor="inital"
    ripplecolor="initial";
    iconcolor="initial";
    thumbcolor="initial";
    hideHeader=true;
    headershowdiv=false;
    pageContext:any;
    deviceInfo;
    respStartTime;
    responseID;
    @HostBinding( '@.disabled' ) private disabled = true;
    constructor( iconRegistry: MatIconRegistry,
        private router: Router,
        private datePipe: DatePipe,
        private sanitizer: DomSanitizer,
        platformLocation: PlatformLocation,
        private location: Location,
        private _sanitizer: DomSanitizer,
        private frmSrv: FormService,
        public dialog: MatDialog,
        private mService: MessagingService,
        private deviceService: DeviceDetectorService,
        private snackBar: MatSnackBar ) {

        iconRegistry.addSvgIcon('Setting',sanitizer.bypassSecurityTrustResourceUrl( 'assets/icon/setting.svg' ) );
        iconRegistry.addSvgIcon('Delete',sanitizer.bypassSecurityTrustResourceUrl( 'assets/icon/delete.svg' ) );
        iconRegistry.addSvgIcon('Morevert',sanitizer.bypassSecurityTrustResourceUrl( 'assets/icon/morevert.svg' ) );
        this.passURL = sanitizer.bypassSecurityTrustResourceUrl( this.cssURL );
        this.mService.consume().subscribe(( m: any ) => {this.reactOnMessage( m );});
    }
    mainDivclicked(event){
        console.log("Hi krunal -------hhhh------------>.>>>");
        if(!this.headershowdiv)
          this.hideHeader=true;
    }
    showHeader(event){
        console.log("Hi krunal ------------------->.>>>",event);
        this.hideHeader=false;
        this.headershowdiv=!this.headershowdiv;
        

    }
    async epicFunction() {
      
        this.deviceInfo = this.deviceService.getDeviceInfo();
        let deviceType='Unknown';
        if(this.deviceService.isMobile())
            deviceType='Mobile'
        else if(this.deviceService.isTablet())    
            deviceType='Tablet'
        else if(this.deviceService.isDesktop())    
            deviceType='Desktop'    
        this.deviceInfo.deviceType=deviceType;
        this.respStartTime=new Date().getTime();
      
        if(!this.responseID && this.mode=='live' && this.formID)
        {
            
            this.respJson.browser=this.deviceInfo.browser;
            this.respJson.browser_version=this.deviceInfo.browser_version;
            this.respJson.os=this.deviceInfo.os;
            this.respJson.os_version=this.deviceInfo.os_version;
            this.respJson.orientation=this.deviceInfo.orientation;
            this.respJson.resp_duration=0;
            this.respJson.deviceType=deviceType;
            this.respJson.formID=this.formID;
            //this.respJson=await this.frmSrv.getReqeustDetails(this.respJson);
            let reqInfo=await $.getJSON(this.ipDetailsURL,function(reqInfo){return reqInfo;});
            console.log("reqInfo========>",reqInfo);
             this.respJson.IpAddress=reqInfo.ip;
           this.respJson.resp_country=reqInfo.country_name;
           this.respJson.resp_countrycode=reqInfo.country_code;
           this.respJson.resp_state=reqInfo.region;
           this.respJson.resp_city=reqInfo.city;
           this.respJson.latitude=reqInfo.latitude;
           this.respJson.longitude=reqInfo.longitude;
           this.respJson.resolution=window.screen.width+'x'+window.screen.height;
            
            console.log("Saving response on visiting form ",this.respJson);
            this.frmSrv.saveResponse(this.formID,this.respJson)
             .subscribe(resp=>{this.responseID=resp.data;console.log("Form response saved and response id ",resp),
            error=>{console.log("Error generated while saving response")}});
        }
        console.log(this.deviceInfo); // returns if the app is running on a Desktop browser.
      }
    next(){
        
       
        let isValid=this.validateFields(this.frm.pages[this.currentPageNo-1].pageFields);
        console.log("isvalid=================",isValid);
        if(isValid){
            console.log("fieeldss validdaton done moving to next page------------>")
            this.inputPageFields=this.frm.pages[this.currentPageNo].pageFields;
            this.currentPageNo=this.currentPageNo+1;
        }
        this.overrideMeterialCSS();
        
        
    }
    previous(){
        
        this.inputPageFields=this.frm.pages[this.currentPageNo-2].pageFields;
        this.currentPageNo=this.currentPageNo-1;
        
    }
    validateFields(pageFields:FormField[]):boolean{
        let noError: boolean = true;;
        console.log("inside validation form field size is ",this.inputPageFields.length);
        pageFields.forEach( field => {
            console.log("inside validation form field name ",field.name);
            console.log("inside validation form field control ",field.frmControl);
            if ( field.frmControl.invalid ) {
                noError=false;
                console.log("Form field ",field.name,"is invalid");
                console.log("Form control ",field.frmControl);
                console.log("2");      
                console.log("noerror set to false");     
                
            }
            if ( field.subfields ) {
                field.subfields.forEach( subfield => {

                    if ( subfield.frmControl && subfield.frmControl.invalid ) {
                        noError=false;
                        console.log("3");           
                        console.log("noerror set to false");
                       
                    }
                } )
            }
        });
        console.log("returning true from validation noError=",noError);
        return noError;
    }
    addDummyController(){

        if (this.frm && this.frm.pages) {
            this.frm.pages.forEach(page => {
                if (page && page.pageFields) {
                    page.pageFields.forEach(val => {
                        if (!val.id)
                            val.id = this.frmSrv.getRandom();
                        if (!val.frmControl) val.frmControl = new FormControl('',[]);
                    });
                }
            });
        }

    }
    rowClicked(field)
    {
        console.log("field div clickeed field name =",field.name);
    }
    ngOnInit() {
        let url: any
        this.epicFunction();
        this.dummyController=new FormControl( '', [Validators.maxLength( 10000)] );
        for ( var i = 0; i < 60; i = i + 10 ) { this.minutes.push( i + '' ); }
        if ( this.frm && this.formID ) {
            /// this.addFieldValidations();
            this.setFormBGStyle();
            console.log("Current form object.....",this.frm);
            
            
            if(this.mode!="build")
            {
                
                this.currentPageNo=1;
                this.addFieldValidations();
                console.log("validators added--> now setting current fields");
               // this.inputPageFields=this.frm.pages[0].pageFields;
                this.pageNo=1;
                console.log("hi........ keyur ..... total after setting formfields length is ..........",this.inputPageFields.length);
            }
            if(this.mode=="build")
                this.addDummyController();
            if(this.mode=='build' || this.mode=='preview')
                this.fileUploadURL='/api/file123';
            else
                this.isLive=true;
            if(this.mode=='build')
                this.isBuild=true;
        }
        else {
            //console.log("form not found an mode is ",this.mode);
//            console.log( "do not get formid=" + this.formID )
            this.frm = {
                id: '', name: '', type: 'form', title: 'Sample form', path: 'sample',
                status: 'Active', bgColor: '#ffffff', bgImage: '', header: '',
                footer: '', theme: '', formFields: [], _links: '', opacity: 0,
                response: 0, pageBGColor: '#0000ff', formBgImage: '', formImages: null,
                thanksdata: 'Thanks You. You have successfully submitted your response, you might get email confirmation for the same.',
                thankstype: 'message',
                formwidth: 600,
                pages:null,
                layout:'classic',
                publishdate: null,
                publishtime: "00:00",
                publishtimezone: "GMT +5:30",
                publishstatus: "",
                publishuptodate: null,
                publishuptotime: "",
                visibility: "Public",
                publishnow: false,
                createdDate: null,
                style: "",
                btnStyle: "",
                inputStyle:null,

            };
        }
        this.setClass();
    }
    ngAfterViewInit()
    {
        this.setFormBGStyle();
    }    
    
    
    
    reactOnMessage( msg: any ):any {
        console.log("Broadcaasted message in form ts ",msg.id)
        if(msg && msg.changeCSS)
        {   console.log("change css found calling method to change css" )
            this.overrideMeterialCSS();
            return '';
        }
        console.log("do not return after changing css" )
        if(msg.id=='setting' || msg.id=='close')
            return '';
        else if(msg.id=='dayFilter')
        {
            this.setDayFilter(msg.field);
            return '';
        }
        if(msg.title)
        {
            this.frm = msg;
            if ( this.frm ) {
                this.setFormBGStyle();
            }
        }
        
        
    }
    resolved($event)
    {
        console.log($event);
    }
    spinnerNumberChange($event)
    {
//        console.log($event);
    }
    setFormBGStyle() {
        this.bgStyle = '';
        if(this.frm.layout && this.frm.layout=='card')
            this.bgStyle="padding-top:30px;border-radius:10px;"
        if ( this.frm.opacity && this.frm.opacity != 0 )
            this.bgStyle = 'opacity:' + ( 1 - ( this.frm.opacity / 100 ) ).toPrecision( 2 ) + ";";
        if ( this.frm.formwidth && this.frm.formwidth != 0 )
            this.bgStyle = this.bgStyle + 'max-width:' + this.frm.formwidth + "px;";
        if ( this.frm.formBgImage != null && this.frm.formBgImage != '' )
            this.bgStyle = this.bgStyle + "background-image: url('" + this.imgURL + this.frm.formBgImage + "');";
        else if ( this.frm.bgColor != null && this.frm.bgColor != '' )
            this.bgStyle = this.bgStyle + "background:" + this.frm.bgColor+";";
//        if(this.isBuild)
//            this.bgStyle=this.bgStyle+" border: 2px dashed #c5c6c8;";
//        else
//            this.bgStyle=this.bgStyle+" border: 1px solid #c5c6c8;";
        this.updateCompStyle();
    }
    updateCompStyle() {
        this.compStyle = "";
        if ( this.frm.pageBGColor )
            this.compStyle = "background:" + this.frm.pageBGColor + ";";
        if ( this.frm.bgColor )
            this.compStyle = this.compStyle + "color:" + this.frm.bgColor + ";";
        this.overrideMeterialCSS();
    }
  
   
    addFieldValidations()
    {
        this.dummyController=new FormControl( '', [Validators.maxLength( 10000)] );
        this.frm.pages.forEach(page=>{
        page.pageFields.forEach( field => {
            let vl = [];
            if ( field.required )
                vl.push( Validators.required );
            if ( field.selectedValidation == 'Email' ||field.type=='email')
                vl.push( Validators.email );
            if ( field.maxlen && field.maxlen != 0 )
                vl.push( Validators.maxLength( field.maxlen ) );
            if ( field.minlen && field.minlen != 0 )
                vl.push( Validators.minLength( field.minlen ) );
            if ( field.type == 'number' ) {
                vl.push( Validators.pattern( "^[0-9]*$" ) );
                vl.push( Validators.max( field.maxlen ) );
                vl.push( Validators.min( field.minlen ) );
          

            }
            if(field.type=='dropdown')
                if(field.selectedOption && !field.dropDownMultiSelect)
                    field.selectedOption.forEach(val=>{field.selectedOptionStr='';field.selectedOptionStr+=val+','})
            if(field.mindate)
                field.mindate=new Date(field.mindate);
            if(field.maxdate)
                field.maxdate=new Date(field.maxdate);
            if(field.type=="date-picker")
            {
                if(field.onlypast && this.mode=="live")
                {
                    let  dt = new Date();
                    if(field.excludePresent)
                        dt.setDate(dt.getDate()-1);
                    field.maxdate=new Date();
                    field.maxdate.setDate(dt.getDate());
                }
                if(field.onlyfuture && this.mode=="live")
                {
                    let  dt = new Date();
                    if(field.excludePresent)
                        dt.setDate(dt.getDate()+1);
                    field.mindate=new Date();
                    field.mindate.setDate(dt.getDate());
                }
                this.setDayFilter(field);
                
                
            }
            
            field.frmControl = new FormControl( '', vl );
            if ( field.subfields ) {
                console.log("Got subfields for ",field.name);
                field.subfields.forEach( subField => {
                    let vlsub = [];
                    if ( subField.required ||field.required) {
                        if ( subField.visible )
                         {
                            
                            vlsub.push( Validators.required );
                         }   
                    }
                    console.log("subfield for ",subField.name," is required=",subField.required," control=",vlsub);
                    subField.frmControl = new FormControl( '', vlsub );
                } )
               
                field.frmControl = new FormControl( '', []);//empty controller for parent field
            }

        } );});
        
    }
    setDayFilter(field:FormField)
    {
        field.dayFilter = (d: Date | null): boolean => {
            const day = (d || new Date()).getDay();
            // Prevent Saturday and Sunday from being selected.
            if(field.excludeDays)
                return !field.excludeDays.includes(day+'');
            else return true;
          }
    }
    public setClass() {
        this.overrideMeterialCSS();
    }
    updateDropdownOption(field:FormField){
        console.log("Inside -------->upddaate dropdoowoption ")
        console.log("Inside -------->field.selectedOptionStr= ",field.selectedOptionStr);
        console.log("Inside -------->field.selectedOption= ",field.selectedOption);
        field.selectedOption=[];
        if(field.selectedOptionStr)
            field.selectedOption.push(field.selectedOptionStr);
        console.log("Inside -------->field.selectedOption= ",field.selectedOption);
            
    }
    
   
    public overrideMeterialCSS() {
        let tmpthis = this;
        //      SOURCE OF LIGH OR DARK COLOR CHECK :https://codepen.io/andreaswik/pen/YjJqpK?__cf_chl_jschl_tk__=b39d8d28aa7e02d1b2974fbe64031e57e4309f84-1591907993-0-AShUPBA3mpZ4RXMLVvf1KOILLeMaYDIAXbqnnMEbioAmteUvsKn0f-jfizts_NpZUuBOXDG1cr79fzlFIyFrkYn1q0011MYoLVy6TPnugzAWmZZ_LA0EbcRb0u35CybvI1a-KritJApWyZKuQ2VU-eQIPUuDdLG_xQRICX9Mtt6yHgSBeJyeC1iGJd8lyoHegA8dzhIoaIncMwXUddBlBmogq2qtD9wTVcm47utUlP0OzD9kWGO-0u7rNllB2KhiBms6HYVwnRtWJfcuB8i7wz-9pwR1FLNYgEBooQDJqiEyz6YxJDSPhsE421h4J2tugV9s1ESdbJag5z6o85T6kKMEAjvwAzOKXEZ2f5XHPfJ6
        
        if(this.frm.layout && this.frm.layout=='card')
            this.cardFormStyle="padding-top:45px;"
        let fontcolor;
        if(tmpthis.frm.style)
            fontcolor=this.frmSrv.getStyleValue(tmpthis.frm.style, "fntColor");
        
    
        if(fontcolor)
        {
            tmpthis.compbgcolor = fontcolor;
            tmpthis.inputbordercolorfocus=fontcolor;
            tmpthis.inputfontcolor=fontcolor;
            tmpthis.ripplecolor=fontcolor;
            tmpthis.drpDownBGColor=tmpthis.frm.bgColor;
            tmpthis.compbgcolor = tmpthis.frm.bgColor;
            tmpthis.compcolor=fontcolor;
            tmpthis.iconcolor=fontcolor;
            tmpthis.drpDownFontColor=fontcolor;
            
            
        }
        $( document ).ready(
            function changeMatCSS() {
                let r, g, b,tr,tg,tb;
                let color = tmpthis.frm.bgColor.toLocaleLowerCase();
                let clr: any;
                clr = color;
                if ( color.match( /^rgb/ ) ) {
                    clr = clr.match( /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/ );
                    r = clr[1]; g = clr[2]; b = clr[3];
                }
                else {
                    // If RGB --> Convert it to HEX: http://gist.github.com/983661
                    clr = +( "0x" + color.slice( 1 ).replace( clr.length < 5 && /./g, '$&$&' ) );
                    r = clr >> 16;g = clr >> 8 & 255;b = clr & 255;
                }
                tr=255-r;tg=255-g;tb=255-b;
                if(tr==0 && tg==0 && tb==0)
                    { tr=150;tg=150;tb=150; }
                (r>100)?tr=r*0.7:tr=r*1.4;
                (g>100)?tg=g*0.7:tg=g*1.4;
                (b>100)?tb=b*0.7:tb=b*1.4;
                
                tmpthis.thumbcolor="rgba("+tr+","+tg+","+tb+",1)";
                
                // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
                let hsp = Math.sqrt(
                    0.299 * ( r * r ) + 0.587 * ( g * g ) + 0.114 * ( b * b )
                );
                // Using the HSP value, determine whether the color is light or dark
                if( hsp > 127.5 ){
                    tmpthis.inputbordercolor = "#000000"
                    tr=r*0.5;
                    tg=g*0.5;
                    tb=b*0.5 ; 
                    
                        }
                else{
                    tmpthis.inputbordercolor = "#ffffff";
                    
                    tr=r*2;
                    tg=g*2;
                    tb=b*2;
                    
                }
                tmpthis.thumbcolor="rgba("+tr+","+tg+","+tb+",1)";
                
//                tmpthis.drpDownFontColor=inputbordercolor;
                $( '.nav-color' ).each( function() { 
                    this.style.setProperty( '--input-border-color', tmpthis.inputbordercolor);
                    this.style.setProperty( '--input-border-color-focus', tmpthis.inputbordercolorfocus);
                    this.style.setProperty( '--input-font-color', tmpthis.inputfontcolor);
                    this.style.setProperty( '--comp-color', tmpthis.compcolor);
                    this.style.setProperty( '--comp-bg-color', tmpthis.compbgcolor);
                    this.style.setProperty( '--ripple-color', tmpthis.ripplecolor);
                    this.style.setProperty( '--icon-color', tmpthis.iconcolor);
                    this.style.setProperty( '--thumb-color', tmpthis.thumbcolor);
                    
                  });
             }
        )
    }
    setDropDownCSS()
    {
       let tmpthis=this;
        $( '.mat-option').each( function() {
            this.style.setProperty( '--comp-color', tmpthis.drpDownFontColor);
            this.style.setProperty( '--comp-bg-color', tmpthis.drpDownBGColor);
        });
        $( '.select-group-label-frm .mat-optgroup-label').each( function() {
            this.style.setProperty( '--comp-color', tmpthis.drpDownFontColor);
            this.style.setProperty( '--comp-bg-color', tmpthis.drpDownBGColor);
        });
        
    }
    setCalandarCSS() {
        let tmpthis=this;
        $( '.mat-datepicker-content').each( function() {
            this.style.setProperty( '--comp-color', tmpthis.drpDownFontColor);
            this.style.setProperty( '--comp-bg-color', tmpthis.drpDownBGColor);
        });
        }

    public remove( field ) {
        field.hardDelete=true;
        //var index = this.inputPageFields.indexOf( field );
        //this.inputPageFields.splice( index, 1 );
        //            this.saveForm(false);
    }
    public dateFilter(field)
    {
       console.log("WWWWWWWWWW date filter called for field.id",field.id);
        return true;
    }
    public toggleValueChange( field:FormField , e )
    {
        if(e.checked)
            field.checked=true;
        else
            field.checked=false;
    }
    showSetting( field: FormField ) {
        this.openCloseRightPanel();
        let obj: any={id:'setting',frm:this.frm,field:field};
//        console.log("77777777777777777777");
        this.mService.produce(obj);
        
        
        
//        const dialogConfig = new MatDialogConfig();
//        dialogConfig.disableClose = true;
//        dialogConfig.autoFocus = true;
//        dialogConfig.width = '760px';
//        dialogConfig.height = '800px';
//        if ( !field.fname || field.fname == '' )
//            field.fname = field.name;
//        dialogConfig.data = { field:'',formFields:''};
//        dialogConfig.data.field = field;
//        dialogConfig.data.height = '1000px';
//        dialogConfig.data.width = '600px';
//        dialogConfig.data.formFields = this.frm.formFields;
//        const dialogRef = this.dialog.open( ElementPropDialogComponent, dialogConfig );
//        dialogRef.afterClosed().
//            subscribe( result => {
//                if ( result ) {
//                    field = dialogConfig.data;
//                    this.updateFrmControl( field );
//                }
//            } );
    }

    updateFrmControl( field: FormField ) {
        let vl = [];
        if ( field.required )
            vl.push( Validators.required );
        if ( field.selectedValidation == 'Email' )
            vl.push( Validators.email );
        if ( field.maxlen != 0 )
            vl.push( Validators.maxLength( field.maxlen ) );
        if ( field.minlen != 0 )
            vl.push( Validators.minLength( field.minlen ) );
        field.frmControl = new FormControl( '', vl );
        //         this.saveForm(false);

    }
    sanitize( image ) {
        return this._sanitizer.bypassSecurityTrustStyle( `linear-gradient(rgba(29, 29, 29, 0), rgba(16, 16, 23, 0.5)), url(${image})` );
    }
    sanitizeHTML( style: string ): SafeStyle {
        return this._sanitizer.bypassSecurityTrustStyle( style );
    }

    saveForm( showNotification: boolean ) {
        let strFields: FormField[] = [];
        if ( this.inputPageFields ) {
            this.inputPageFields.forEach( val => {
                if ( !val.id )
                    val.id = this.frmSrv.getRandom();
                if ( val.frmControl ) val.frmControl = null;
            } );
        }
//        console.log("MODE BEFORE SAVING IS ",this.mode);
        console.log("saving form ",this.frm);   
     
        const saveFormObj = this.frmSrv.saveForm( this.frm, this.formID )
            .subscribe( response => {
                this.formID = response.data;
                if ( showNotification )
                    this.showNotification( 'top', 'center', 'Form saved successfully', 's',3000 );
                this.addFieldValidations();
            } );

    }
    showNotification( from, align, msg, msgType,delay:number ) {

        const type = ['', 'info', 'success', 'warning', 'danger'];

        let color = Math.floor(( Math.random() * 4 ) + 1 );
        if ( msgType == 's' ) { color = 2; }
        if ( msgType == 'f' ) { color = 4; }
        if ( msgType == 'i' ) { color = 1; }
        if ( msgType == 'w' ) { color = 3; }

        $.notify( { icon: "notifications", message: msg }, {
            type: type[color],
            timer: 100,
            delay: delay,
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
        } );
    }
    previewForm() {

    }
    addEvent( type: string, event: MatDatepickerInputEvent<Date> ) {
        //      this.setClass();
    }
    drop( event: CdkDragDrop<FormField[]>,pageno ) {
        console.log("Inside form drop event called page no is ",pageno);
        moveItemInArray( this.inputPageFields, event.previousIndex, event.currentIndex );
    }
    openCloseRightPanel()
    {
        let obj:any={id:'close'}
        this.mService.produce(obj);
    }
    
    dataURLtoFile(dataurl):File {
       if(!dataurl) return null;
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        let fileName='Signature-'+this.frmSrv.getRandom()+'.png';
            
         const imageFile: File = new File([u8arr], fileName, {type: "png"
                              });
         return imageFile;
      }
    async uploadSignature(field,f) : Promise<any>{
        if(!f)return;
        let promise = new Promise((resolve)=>{
                this.frmSrv.uploadResource(f).subscribe(
                    data=>{
                             let result: any = data;
                             let respJ={ value: result.fileid, type: 'signature'} ;
                             this.respJson[field.id] = respJ;
                             resolve('');
                    },
                    error=>{
                        resolve('');
                    });
        });
        return promise;
    }
    async getPublicIP() : Promise<any>{
        let promise = new Promise((resolve)=>{
   
        const ipObservable = this.frmSrv.getPublicIP().subscribe( data => {
            let result: any = data;
            this.respJson.IpAddress = result.ip;
            //get location data for retrived ip address
            if(result.ip)
            {    
                this.frmSrv.getIPDetail(result.ip).subscribe(
                data1 => {
                    this.respJson.resp_country = data1.country_name;
                    this.respJson.resp_state = data1.region;
                    this.respJson.resp_city = data1.city;
                    this.respJson.latitude = data1.latitude;
                    this.respJson.longitude = data1.longitude;
                    this.respJson.offset = data1.offset;
                    resolve('');

                },
                err1 => { console.log( "IP details", err1 );resolve('') });
            }
        }, ( err ) => {
            console.log( "IP error ", err );
            this.respJson.IpAddress = "Not found";
            resolve('');
        } )});
        return promise;

    }
    setDropDownVal(field:FormField){
        let multiOption = new Map();
        let value = field.frmControl.value;
        if(field.dropDownMultiLevel && field.dropDownMultiSelect)
        {
            if ( value ) {
                value.forEach( op => {
                    if ( op.includes( '@opt@' ) ) {
                        let keyval = op.split( '@opt@' );
                        if ( multiOption.has( keyval[0] ) ) {
                            let val = multiOption.get( keyval[0] ) + ',' + keyval[1];
                            multiOption.set( keyval[0], val );
                        }
                        else {
                            multiOption.set( keyval[0], keyval[1] );
                        }
                    }
                } );
                let finalSel = [];
                if ( multiOption ) {
                    multiOption.forEach(( val, key ) => {
                        let opAr = val.split( "," );
                        finalSel.push( { key: key, options: opAr } )
                    } );
                    value = finalSel;
                }
                let respJ = { value: value, type: 'dropdownMSML' };
                this.respJson[field.id] = respJ;
            }
        }
        else if ( field.dropDownMultiLevel ) {
            if ( value && value.includes( '@opt@' ) ) {
                let keyval = value.split( '@opt@' );
                let arrSelectedObjs=[];
                let options = [];
                options.push(keyval[1])
                value = { key: keyval[0], options: options };
                arrSelectedObjs.push(value);
                let respJ = { value: arrSelectedObjs, type: 'dropdown' };
                this.respJson[field.id] = respJ;
            }
        }
        else if ( field.dropDownMultiSelect ) {
            if ( value ) {
                let arrSelectedObjs=[];
                value = { key: '', options: value };
                arrSelectedObjs.push(value);
                let respJ = { value: arrSelectedObjs, type: 'dropdown' };
                this.respJson[field.id] = respJ;
            }
        }
        else if ( value ) {
                let arrValue=[]
                let arrSelectedObjs=[];
                arrValue.push(value);
                value = { key: '', options: arrValue };
                arrSelectedObjs.push(value);
                let respJ = { value: arrSelectedObjs, type: 'dropdown' };
                this.respJson[field.id] = respJ;
        }
        
    }
    submitButtonChange(field:FormField,isShowErrorMsg:boolean)
    {
        this.$event.target.innerText=field.name;
        this.$event.target.disabled=false;
        this.saveResponseLoader=false;
        if(isShowErrorMsg)
            this.showNotification('top','center','Opps something wrong happened, please try again later', 'f',3000);
        return;
    }
    //qaqa
    async onSubmit($event,btnField:FormField) {
        
        console.log("onsubmit call mode is ",this.mode)
        if(this.mode=="build")
           return;
        else if(this.mode=="preview")
        {
            this.showNotification( 'top', 'center', "You can't submit form in preview mode", 'i',3000);
            return;
        }
        console.log("1");           
        let isError: boolean = false;
        let successValidation=this.validateFields(this.inputPageFields);
        if(!successValidation) $event.target.disabled=false;
        
        if ( successValidation) {
            this.$event=$event;
            $event.target.innerText=btnField.title;
            $event.target.disabled=true;    
            this.buttonFiled=btnField;
            this.saveResponseLoader=true;
            this.respJson.formID = this.formID;
            this.respJson.resTime = this.datePipe.transform( new Date(), 'dd-MM-yyyy HH:mm:ss zzzz' );
            for(let page of this.frm.pages) {
                for(let field of page.pageFields) console.log("field name=",field.name, "field.id=",field.id);
            }
            for(let page of this.frm.pages){   
                for(let field of page.pageFields)
                {    
                
                    let value = field.frmControl.value
                    if ( !this.excludeFieldTypes.includes(field.type)) {
                        console.log("Field type==>",field.type);
                        if ( field.type == 'signature' ) {
                            let f: File = this.dataURLtoFile( field.signImage );
                            const obj = await this.uploadSignature( field, f);
                        }
                        else if ( field.type == "date-picker" ) {
                            
                            value = this.datePipe.transform( value, 'yyyy-MM-dd' );
                            let respJ = { value: value, type: 'datetime' };
                            if(value)
                                this.respJson[field.id] = respJ;
                        }
                        else if ( field.type == "dropdown" )
                        {    
                        console.log("Inside dropdown");
                        this.setDropDownVal(field);
                        }
                        else if ( field.type == "fullname" ) {
                            if ( field.subfields ) {
                                field.subfields.forEach( subfield => {
                                    if ( subfield.visible && subfield.frmControl.value ) {
                                        this.respJson[subfield.name] = subfield.frmControl.value;
                                    }
                                } );
                            }
                        }
                        else if ( field.type == "survey" ) {
                            if ( field.survey.questions ) {
                                let surveyresp={survey:[]};
                                surveyresp.survey=[];
                                field.survey.questions.forEach( q => {
                                    if ( q.selectedValue ) {
                                    let surveyObj={value:q.selectedValue,subHeader:q.name}
                                        surveyresp.survey.push(surveyObj);
                                    }
                                } );
                                this.respJson[field.id]=surveyresp;
                            }
                        }
                        else if ( field.type == "address" ) {
                            if ( field.subfields ) {
                                field.subfields.forEach( subfield => {
                                    if ( subfield.visible && subfield.frmControl.value ) {
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
                                if(field.subfields[0].frmControl.value)
                                this.respJson[field.id] = selTime;
                            }
                        }
                        else if ( field.type == "phone" ) {
                            if ( field.subfields ) {
                            
                                let telePhone="";
                                let code=""
                                if(field.subfields[0] && field.subfields[0].frmControl.value)
                                    code = field.subfields[0].frmControl.value;
                                if(field.subfields.length>1 && field.subfields[1] && field.subfields[1].frmControl.value)
                                    telePhone = field.subfields[1].frmControl.value;
                                if(code) telePhone=code+'-'+telePhone
                                if(telePhone)
                                    this.respJson[field.id]=telePhone;
                            }
                        }
                        else if ( field.type == "upload" ) {
                            if ( field.submitValue ) {

                                this.respJson[field.id] = field.submitValue;
                            }
                        }
                    
                        else if ( field.type == "rating" ) {
                            this.respJson[field.id] = this.currentRate;
                        }
                        else if ( field.type == "productlist" && (!field.productList.total || field.productList.total==0) ) {
                            this.showNotification('top', 'center','Your cart is empty','f',3000);
                            this.submitButtonChange(btnField,false);
                            return;
                        }
                        else if ( field.type == "productlist" && field.productList.total>0 ) {
                        
                            let payObserver=await  this.completePayment(this.frm);
                        }
                        else if ( field.type == "email" && value) {
                            this.respJson[field.id] = value;
                        }
                        else if ( field.type == "slide-toggle" ) {
                        if(field.checked)
                            this.respJson[field.id] = "Accepted";
                        
                        }
                        else if ( field.id && value)
                            this.respJson[field.id] = value;
                        console.log("after page no",page.pageNo, " response json------->",this.respJson);

                    }
            
                }
             }


           // const isCmp = await  this.getPublicIP();
            console.log("Saving form--this.isPaymentForm--->",this.isPaymentForm);
            console.log("Saving form--this.isPaymentSuceess--->",this.isPaymentSuceess);
            if(this.isPaymentForm)
            {
                if(this.isPaymentSuceess)
                {
                    this.saveFormResponse();
                    return;
                }
                else
                  {     this.saveResponseLoader=false;
                        return;
                  }
            }
            else
                this.saveFormResponse();
//            console.log( "todaynew1111", this.respJson );
        
        }
    }
    //sdsd
    async completePayment(frm:Form) : Promise<any> {
      
//        dummy card details
//        card no : 4012 0010 3714 1112 exp: 05/20 cvv:123 otp: 123456
        this.isPaymentForm=true;
        let paymentDetail:PaymentDetail;
        let prdInfo="";
        let transTotal=0.0;
        let currency="";
        let ordersummary={products:[],txnid:'',currency:'',cardnum:'',status:'',txnMessage:'',amount:'',discount:'',phone:'',}
        let field;
        for ( let f of frm.formFields ) if(f.type=="productlist") field=f;
        this.finalPaymentDetail=new PaymentDetail();
        this.finalPaymentDetail.amount = field.productList.total.toFixed( 2 );
        this.finalPaymentDetail.firstname = this.respJson["First name"] ? this.respJson["First name"] : "Anonymous";
        this.finalPaymentDetail.email = this.respJson["Email"] ? this.respJson["Email"] : "Anonymous@xyz.com";
        this.finalPaymentDetail.productinfo = prdInfo ? prdInfo : "No Product";
        this.finalPaymentDetail.phone="";//setting phone is mandatory otherwise it payment window will not display
        currency=field.productList.currency;
        transTotal=transTotal+field.productList.total;
        if ( field.productList.products ){
            field.productList.products.forEach(prd => {
                if (prd.quantity > 0) {
                    let prdObj = { title: prd.title, Quantity: prd.quantity, Amount: prd.price }
                    ordersummary.products.push(prdObj);
                }
            });
        }    
        await this.getPaymentDetail(this.finalPaymentDetail);
        if(this.finalPaymentDetail==null)
        {
            this.submitButtonChange(this.buttonFiled,true);
            return;
        }
        let promise = new Promise((resolve)=>{
              /*bolt.launch(this.finalPaymentDetail,
                    {responseHandler: function(BOLT){console.log("Transaction with id :",paymentDetail.txnid," is ",BOLT.response.txnStatus);resolve('')}
              })
              console.log("After bold lunch")*/
            this.doPayment(this.finalPaymentDetail).subscribe(data => {
                console.log("Payment data successfully received", data);
                if (data.txnStatus) {
                    ordersummary.amount = data.amount;
                    ordersummary.discount = data.discount;
                    ordersummary.txnid = data.txnid;
                    ordersummary.cardnum = data.cardnum;
                    ordersummary.status = data.status;
                    ordersummary.phone = data.phone;
                    ordersummary.txnMessage = data.txnMessage;
                    ordersummary.currency = currency ? currency : 'USD';
                    let orderSaveResp = { orderDetails: ordersummary, type: 'order', orderid: data.txnid, status: data.status }
                    this.respJson["Order Summary"] = orderSaveResp;
                    if (data.status && data.status.toLowerCase() == "success") {
                        console.log("Payment SUCCESSFULLY COMPLETED", data.status);
                        this.isPaymentSuceess = true;
                        console.log("Payment SUCCESSFULLY this.isPaymentSuceess", this.isPaymentSuceess);

                    }
                    else
                    {    console.log("Payment processing error data", data);
                        console.log("this.isPaymentSuceess", this.isPaymentSuceess);
                        this.saveResponseLoader=false;
                    }
                    //                                this.saveFormResponse();
                    this.submitButtonChange(this.buttonFiled,false);
                    resolve('');
                }
                else {
                    
                    this.submitButtonChange(this.buttonFiled,true);
                    resolve('');
                }


            }, error => { this.submitButtonChange(field,true);resolve(''); }
            )
         });
        return promise;
    }
   
    saveFormResponse()
    {
     
        let duration=new Date().getTime()-this.respStartTime;
        this.respJson.resp_duration=duration;       
        const formObj = this.frmSrv.updateResponse( this.responseID, this.respJson ).subscribe(
                data => {
//                    console.log( data )
                    this.router.navigate( ["/form/" + this.formID + "/thanks"] );
                },
                error => {
                    this.submitButtonChange(this.buttonFiled,true);
                    console.log( error ); return; } ); 
    }
    
 
    onFileComplete( data: string ) {
     
        if(this.mode=="build" || this.mode=="preview")
            return;
        
        var fileJson = JSON.parse( data );
        
        this.frm.formFields.forEach( field => {
            if ( field.type == 'upload' ) {
                
                
                
                if (field.name== fileJson.fieldName ) {
                    let sval={type:'file',files:[]}
                    if(!field.submitValue)
                        field.submitValue=sval;
                    if (! field.submitValue.files )
                        field.submitValue.files = [];
//                    field.submitValue = field.submitValue + "<a href='" + "http://localhost:8080/api/file/" + fileJson.id + "'>" + fileJson.name + "</a><br/>";
                    
                    let file={type:'file',name:fileJson.name,id:fileJson.id};
                    if(fileJson.state=="remove")
                    {
                        fileJson.state=null;
                      
                       
                        let i=0;
                        let ind=-1;
                        field.submitValue.files.forEach(f=>{
                            if(f.name==fileJson.name)
                                ind=i;
                            i++;
                        })
                        
                        if (ind > -1) {
                              field.submitValue.files.splice(ind, 1);
                             
                        }
                    }
                    else
                        field.submitValue.files.push(file);
              
                }

            }
        } )
        


    }
//    METHODS FOR SIGNATURE COMPONENT
    //    END METHODS FOR SIGNATURE COMPONENT
    
    async getPaymentDetail(paymentDetail:PaymentDetail):Promise<any>{
        let promise=new Promise<any>((resolve)=>{
            this.frmSrv.getPaymentHash(paymentDetail).subscribe(data=>{   
                this.finalPaymentDetail=data.data;
                console.log("new payment detail from server ",paymentDetail); 
                resolve('');   
             },error=>{this.finalPaymentDetail=null;resolve('');})
        });
        console.log("returning promise from getpaymentdetail")
        return promise;
    }
    //PAYUMONEY PAYMENT METHODS
    doPayment(paymentDetail:PaymentDetail):Observable<any>
    {
       return new Observable(observer=>{
        this.frmSrv.getPaymentHash(paymentDetail).subscribe(data=>{
            paymentDetail=data.data;
            console.log("calling bolt lunch with txnid",paymentDetail.txnid );
            bolt.launch(
                    paymentDetail,
                    { responseHandler: function(BOLT)
                        {
                            
                            console.log("Transaction with id :",paymentDetail.txnid," is ",BOLT.response.txnStatus);
                            observer.next(BOLT.response);
                            observer.complete();
                        }
                     });
        },error=>{console.log(error)});
//        if(!paymentDetail.hash)
//        {
//            console.log("Error getting hash");
//            observer.error("Not able to generate hash value");
//            observer.complete();
//        }
       
       });
    }
   
    //END PAYUMONEY PAYMENT METHODS

    //inline editor properties
    flr_options: Object =
    {
        toolbarInline: true,
        //initOnClick: true,
        charCounterCount: false,
      //  height:250,
        imageUploadParam: 'image_param',
        //            imageUploadURL: '/editorImages',
        imageUploadParams: { id: 'my_editor' },
        imageUploadMethod: 'POST',
        quickInsertEnabled: false,
        imageMaxSize: 5 * 1024 * 1024,
        imageAllowedTypes: ['jpeg', 'jpg', 'png'],
        events: {
            'froalaEditor.initialized': function() {
                console.log( 'flr initialized' );
            },
            'froalaEditor.image.beforeUpload': function( e, editor, images ) {
  
                if ( images.length ) {
                    // Create a File Reader.
                    const reader = new FileReader();
                    // Set the reader to insert images when they are loaded.
                    reader.onload = ( ev ) => {
                        const result = ev.target['result'];
                        editor.image.insert( result, null, null, editor.image.get() );
                        console.log( ev, editor.image, ev.target['result'] )
                    };
                    // Read image as base64.
                    reader.readAsDataURL( images[0] );
                }
                // Stop default upload chain.
                return false;
            }
  
        }
    }
    //end inline editor properties
}

