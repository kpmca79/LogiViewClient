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
import { SubField } from "../../model/SubField";
import { PerfectScrollbarConfigInterface,PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { ActivatedRoute,Router } from "@angular/router";
import { Observable, Observer } from "rxjs";
import * as $ from 'jquery';
import { PaymentDetail } from "../../model/PaymentDetail";



//declare function launch(a:any,b:any): any;

declare const hi:any;

declare const bolt:any;



@Component( {
    selector: 'formdev',
    templateUrl: 'formdev.component.html',
    styleUrls: ['formdev.component.css']
} )
export class FormdevComponent1 implements OnInit {
    @Input() formField: FormField[];
    @Input() frm: Form;
    @Input() formID: String;
    @Input() mode:string;
    captchav2SiteKey="6LfMx64ZAAAAACQ6nRCglIwPacx3AraqI7vLBFSB";
    s=false;
    prevt=null;
    paymentDetail=new PaymentDetail();
    
    ngOnInit() {
      this.flr_options=this.flop;
      this.paymentDetail.amount="60.00";
      this.paymentDetail.firstname="raju shah";
      this.paymentDetail.productinfo="T-Shirt";
      this.paymentDetail.surl="http://localhost:4200/form/5efa60a7b3f0da1be4221f32";
      this.paymentDetail.furl="http://localhost:4200/login";
      this.paymentDetail.phone="9913186039";
      this.paymentDetail.email="raju@gmail.com";
      
    }

      public cnt: string = "Type your question";
    
    show(e)
    {
       
        if(this.s)
            this.cnt=e.target.innerHTML;
            
        
            
        
//        console.log("show called",e.target.innerHTML);
        console.log("show called",e.target.innerHTML);
        this.s=!this.s;
        if(this.s)
            this.ngOnInit();
    
    }
    generateHash()
    {
       
        this.frmSrv.getPaymentHash(this.paymentDetail).subscribe(data=>{this.paymentDetail=data.data;console.log(data)},error=>{console.log(error)});
    }
    launchBOLT()
    {
        console.log("inside bolt");
//        hi();
//        console.log($('#bolt'));
       bolt.launch(
                        this.paymentDetail,
                        { responseHandler: function(BOLT){console.log( BOLT.response.txnStatus );}}
               );
//        
    }
    
    flr_options;
    flop: Object =
    {
//        toolbarInline: true,
        charCounterCount: true,
        height:250,
        imageUploadParam: 'image_param',
        //            imageUploadURL: '/editorImages',
        imageUploadParams: { id: 'my_editor' },
        imageUploadMethod: 'POST',
        quickInsertEnabled: false,
            imageMaxSize: 5 * 1024 * 1024,
        imageAllowedTypes: ['jpeg', 'jpg', 'png'],
        events: {
            'blur':function(e){
//                alert('blur called');
//                alert(e);
////                this.distroy();
//                console.log("this save in blur : ",this.save);
//                this.save.force();
                
                console.log("AADAFSF-----", $('div#froala-editor'));
                if ($('div#froala-editor').data('froala.editor')) {
                   
                  }
            },
            contentChanged: function () {
             
//                console.log("this save in content change : ",this);
//                this.preventDefault();
//                this.save.force();
                
              },
            'froalaEditor.initialized': function() {
//                console.log( 'flr initialized' );
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
        private snackBar: MatSnackBar ) {

  
    }
    
        
    
    
    
   
    
    resolved($event)
    {
        console.log($event);
    }
  
}

