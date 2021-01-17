import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { PlatformLocation } from '@angular/common';
import { FormField } from '../../model/FormField';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem, CdkDragEnd } from '@angular/cdk/drag-drop';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { FormService } from '../../services/form.service';
import { MessagingService } from '../../services/messaging.service';
import { ActivatedRoute } from "@angular/router";
// import { ElementPropDialogComponent } from '../element-prop-dialog/element-prop-dialog.component';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Form } from "../../model/Form";
import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeStyle } from '@angular/platform-browser';
import { ViewEncapsulation, ViewChild } from '@angular/core';
import { MatSidenav } from "@angular/material/sidenav";

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState( control: FormControl | null, form: FormGroupDirective | NgForm | null ): boolean {
        const isSubmitted = form && form.submitted;
        return !!( control && control.invalid && ( control.dirty || control.touched || isSubmitted ) );
    }
}

@Component( {
    selector: 'builder',
    templateUrl: 'form-builder.component.html',
    styleUrls: ['form-builder.component.css']
} )

export class FormBuilderComponent implements OnInit {

    @ViewChild('drawerright') public drawerright: MatSidenav;
    public formID: String;
    frm: Form;
    showRightNav: false;
    type = "form";
    actvieFormField: FormField;
    [x: string]: any;
    title = 'DragDrop';
    students: FormField[] = [];
    studentsnormal: FormField[] = [];
    studentswidgets: FormField[] = [];
    students2: FormField[] = [];
    html: String;
    std: FormField;
    tempVal2;
    build = "build";
    frmBGStyle = "";
    titlemsg = 'form builder demo';
    opened: boolean = false;
    rightOpened: boolean = false;
    notopened: boolean = true;
    showformProper = false;
    chgEvent: any = { "elementadd": false };
    bgImageID = "5ccd9b901fd9be0ae8f74ead";
    bgStyle = "";
    resourceURL = "/api/file/";
    //bgURL="url(http://localhost:8085/api/1/file/5ccd9b901fd9be0ae8f74ead)";
    bgURL = "url(https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)";
    bgURLDirect = null;
    safeBgURL;

    constructor( iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private route: ActivatedRoute,
        private stdSrv: FormService, public dialog: MatDialog, private mService: MessagingService
    ) {
        iconRegistry.addSvgIcon(
            'TextField',
            sanitizer.bypassSecurityTrustResourceUrl( 'assets/icon/textfield.svg' ) );
        iconRegistry.addSvgIcon(
            'Section',
            sanitizer.bypassSecurityTrustResourceUrl( 'assets/icon/section.svg' ) );
        iconRegistry.addSvgIcon(
            'Toggle',
            sanitizer.bypassSecurityTrustResourceUrl( 'assets/icon/toggle.svg' ) );
        iconRegistry.addSvgIcon(
            'TextArea',
            sanitizer.bypassSecurityTrustResourceUrl( 'assets/icon/textarea.svg' ) );
        iconRegistry.addSvgIcon(
            'Dropdown',
            sanitizer.bypassSecurityTrustResourceUrl( 'assets/icon/dropdown.svg' ) );
        iconRegistry.addSvgIcon(
            'Datepicker',
            sanitizer.bypassSecurityTrustResourceUrl( 'assets/icon/datepicker.svg' ) );
        iconRegistry.addSvgIcon(
            'Touch',
            sanitizer.bypassSecurityTrustResourceUrl( 'assets/icon/touch.svg' ) );
        iconRegistry.addSvgIcon(
            'Add',
            sanitizer.bypassSecurityTrustResourceUrl( 'assets/icon/add.svg' ) );
        iconRegistry.addSvgIcon(
            'Close',
            sanitizer.bypassSecurityTrustResourceUrl( 'assets/icon/close.svg' ) );
        iconRegistry.addSvgIcon(
            'Paint',
            sanitizer.bypassSecurityTrustResourceUrl( 'assets/icon/paint.svg' ) );
        iconRegistry.addSvgIcon(
            'Home',
            sanitizer.bypassSecurityTrustResourceUrl( 'assets/icon/home.svg' ) );

        iconRegistry.addSvgIcon(
            'Preview',
            sanitizer.bypassSecurityTrustResourceUrl( 'assets/icon/preview.svg' ) );
        iconRegistry.addSvgIcon(
                'captcha',
                sanitizer.bypassSecurityTrustResourceUrl( 'https://upload.wikimedia.org/wikipedia/commons/a/ad/RecaptchaLogo.svg' ) );
        

        this.mService.consume().subscribe(( m: any ) => {
            this.reactOnMessage( m );
        } )
    }
    openRightPan(event) {
        
        
        if ( this.rightOpened )
        {
            this.rightOpened=false;
            this.drawerright.close();
        }
            this.rightOpened = true; 
            if ( event.field )
                this.actvieFormField = event.field;
            this.notopened = false;
    }
    
    closeRightPan() {
        this.rightOpened = false;

    }
    reactOnMessage( event: any ) {

        if ( event.id == 'dayFilter' )
            return;
        else if ( event.id == 'setting' ) {
            this.type = "field";
            this.openRightPan(event);
            
        
            return;
        }
        else if ( event.id == 'close' ) {
            this.closeRightPan();
            this.type = "form";
            return;
        }

        if ( this.frm ) {

            this.frm = event;
            if ( this.frm.bgImage != null && this.frm.bgImage != '' )
                this.bgStyle = "background-image: url('" + this.resourceURL + this.frm.bgImage + "')";
            else if ( this.frm.pageBGColor != null && this.frm.pageBGColor != '' )
                this.bgStyle = "background:" + this.frm.pageBGColor;
            if ( this.frm.opacity ) {
                let myDiv = document.getElementById( 'form' );
                myDiv.style.opacity = ( 1 - ( this.frm.opacity / 100 ) ).toPrecision( 2 );
            }
            if ( this.frm.opacity == 0 ) {
                let myDiv = document.getElementById( 'form' );
                myDiv.style.opacity = "1";
            }
            this.setFormBG();
        }
    }


    ngOnInit() {
        this.formID = this.route.snapshot.paramMap.get( "id" );
        if ( !this.formID ) {
            this.formID = "5cbf6b83722e3e0ea407271a";
        }
        if ( this.formID ) {
            const formObsrv = this.stdSrv.viewForm( this.formID ).subscribe(
                response => {
                    this.frm = response.data;
                    if ( this.frm.formFields )
                        this.students2 = this.frm.formFields;
                    this.students2.forEach( field => {
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
                    } );
                    if ( this.frm.bgImage )
                        this.bgURL = "url(" + this.resourceURL + this.frm.bgImage + ")";
                    this.bgURLDirect = this.resourceURL + this.frm.bgImage;
                    if ( this.frm.bgImage != null && this.frm.bgImage != '' )
                        this.bgStyle = "background-image: url('" + this.bgURLDirect + "')";
                    else if ( this.frm.pageBGColor != null && this.frm.pageBGColor != '' )
                        this.bgStyle = "background:" + this.frm.pageBGColor;
                    this.safeBgURL = this.sanitizer.bypassSecurityTrustStyle( this.bgURL );
                    this.setFormBG();

                }

            );
        }
        const studentsObservable = this.stdSrv.getFields();
        studentsObservable.subscribe( data => {
            let x = data
            this.students = x.data;
            this.students.forEach(std=>{
                if(std.elemType=='normal')
                    this.studentsnormal.push(std);
                else if(std.elemType=='widgets')
                    this.studentswidgets.push(std);
            });

        } );
    }
    setFormBG() {
        this.frmBGStyle = '';
        if ( this.frm.formwidth && this.frm.formwidth != 0 )
            this.frmBGStyle = "max-width:" + this.frm.formwidth + 'px;';
        if ( this.frm.opacity && this.frm.opacity != 0 )
            this.frmBGStyle = this.frmBGStyle + "opacity:" + this.frm.opacity + ";";
    }
    sanitizeHTML( style: string ): SafeStyle {
        return this.sanitizer.bypassSecurityTrustStyle( style );
    }
    //ChangeBackground(event)
    //{
    ////  console.log("background changed");
    ////  console.log(this.safeBgURL);
    //  this.safeBgURL=event.safeBgURL;
    //  this.bgURLDirect=event.safeBgURL;
    // 
    ////  console.log(this.safeBgURL);
    ////  console.log(event.opacity);
    ////  console.log("setting opacity to ",(event.opacity/100).toPrecision(2));
    //  let myDiv = document.getElementById('form');
    //  myDiv.style.opacity = (1-(event.opacity/100)).toPrecision(2); 
    //}
    addElement(field:FormField){
        console.log("Hi keyur field is clicked ",field.name);
        let fieldToAdd = JSON.parse( JSON.stringify( field ) ) as FormField;
        fieldToAdd.selectedOption = ['option1'];
        fieldToAdd.frmControl = new FormControl( '', [] );;
        this.students2.push(fieldToAdd);
    } 
    drop( event: CdkDragDrop<string[]> ) {
        console.log("drop event called",event);
        if ( event.previousContainer === event.container ) {
            console.log("drop event same container",event);
            moveItemInArray( event.container.data, event.previousIndex, event.currentIndex );
        } else {
            console.log("drop event same containerevent.previousIndex=",event.previousIndex);
            const tempVal2: any = event.previousContainer.data[event.previousIndex];
            let std: FormField = new FormField();
            
            std = JSON.parse( JSON.stringify( tempVal2 ) ) as FormField;
            std.selectedOption = ['option1'];
            std.frmControl = new FormControl( '', [] );;
            
//            this.students2.push( std );
           
            this.students2.splice(event.currentIndex,0,std);
            this.chgEvent.elementadd = false;
            this.chgEvent.elementadd = true;
            this.chgEvent.elementadd = false;
        }
    }
    
    changeorder() {
        let submitIndex = this.students2.findIndex( fld => fld.type === "submit" );
        let tmp = this.students2[submitIndex];
        this.students2[submitIndex] = this.students2[this.students2.length - 1];
        this.students2[this.students2.length - 1] = tmp;
    }

    //showleftpane()
    //{
    //  this.notopened = ! this.notopened;
    //  this.opened = ! this.opened;
    //  
    //  
    //}
    openCloseLeftPanel() {
        this.opened = !this.opened;
        if ( this.opened )
            this.rightOpened = false;
    }
    openCloseRightPanelForForm() {


        this.type = 'form';
        this.openCloseRightPanel();
    }
    openCloseRightPanel() {

        this.rightOpened = !this.rightOpened;
        if ( this.rightOpened )
            this.opened = false;

    }
    showFormProp() {
        this.showformProper = !this.showformProper;
        if ( this.showformProper )
            this.notopened = false;
        else
            this.notopened = true;
    }
    cleanURL(): SafeUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl( this.bgURL );
    }
    
    dragEnd($event: CdkDragEnd) {
        console.log($event.source.getFreeDragPosition());
      }

}

