import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AmazingTimePickerService } from 'amazing-time-picker';
import { FormService } from "app/services/form.service";
import { Form } from "app/model/Form";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";

@Component( {
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
} )
export class SettingsComponent implements OnInit {
    public publishNow = true;
    public formID: String;
    public redirectURL = "";
    white="white";
    public pubURL = "http://localhost:4200/form/";
    public thanks_msg = "Thanks";
    selectedTime = "00:00";
    uptoTime= "00:00";
    selectedUpToTime = "00:00";
    public timezone;
    public timezones = [];
    publishmsg = "";
    publishuptomsg = "";
    pubNowMsg="Publish now";
    dtPubDate;
    dtPubUptoDate;
    dtPubMaxDate;
    tmpDate;
    showUptoMsg=true;
    publishMinDate = new Date();
    unpublishMinDate = new Date();
    frm: Form;
    constructor(
        private route: ActivatedRoute,
        private atp: AmazingTimePickerService,
        private frmSrv: FormService
    ) { }

    ngOnInit() {
        this.formID = this.route.snapshot.paramMap.get( "id" );
        this.pubURL = this.pubURL + this.formID
        console.log( "Publisher page =", this.pubURL );
        this.timezones.push( this.frmSrv.getClientTimezone() );
        
        
        //get form details
        const formObsrv = this.frmSrv.viewForm( this.formID )
            .subscribe( response => {
                this.frm = response.data
                if ( this.frm.publishdate ) {
                    this.dtPubDate = new Date( this.frm.publishdate );
                    if(this.dtPubDate<new Date())
                            this.frm.publishnow=true;
                 
                    this.selectedTime = this.frmSrv.getTime( this.dtPubDate );
                    this.unpublishMinDate=this.dtPubDate;
                }
                if(this.frm.publishuptodate){    
                    this.dtPubUptoDate = new Date( this.frm.publishuptodate );
                    this.dtPubMaxDate=this.frm.publishuptodate;
                    this.uptoTime = this.frmSrv.getTime( this.dtPubUptoDate );
                }
                 this.setMsgs();

            } );

        console.log( "formid got=", this.formID );
    }
    setPublishDate( type: string, event: MatDatepickerInputEvent<Date> ) {

        let selectedDate=new Date( event.value );
        this.frm.publishdate = selectedDate;
        this.frm.publishdate = this.frmSrv.addTimeToDate( this.selectedTime, this.frm.publishdate );
        this.unpublishMinDate.setDate(this.frm.publishdate.getDate()+1);
        this.dtPubMaxDate=this.frm.publishuptodate;
        this.setMsgs();
    }
    setPublishUotoDate( type: string, event: MatDatepickerInputEvent<Date> ) {

        this.frm.publishuptodate = new Date( event.value );
        this.frm.publishuptodate = this.frmSrv.addTimeToDate( this.uptoTime, this.frm.publishuptodate );
        this.setMsgs();
    }
    setPublishTime( ev: any ) {
        if ( !this.frm.publishdate )
            return;
        const amazingTimePicker = this.atp.open();
        amazingTimePicker.afterClose().subscribe( time => {
            this.selectedTime = time;
            this.dtPubDate=this.frmSrv.addTimeToDate( this.selectedTime, this.dtPubDate);
            this.frm.publishdate=this.dtPubDate;
            this.setMsgs();
        } );
    }
    setUnpublishTime( ev: any ) {
        if ( !this.frm.publishuptodate )
            return;
        const amazingTimePicker = this.atp.open();
        amazingTimePicker.afterClose().subscribe( time => {
            this.uptoTime = time;
            this.dtPubUptoDate=this.frmSrv.addTimeToDate( this.uptoTime, this.dtPubUptoDate);
            this.frm.publishuptodate =this.dtPubUptoDate; 
            this.setMsgs();
        } );
    }
    public publishedNow()
    {
      
        this.dtPubDate= new Date();
        this.frm.publishdate=this.dtPubDate;
        
        this.setMsgs();
    }
  
    public setMsgs() {
        
        console.log("setmsgs called");
        console.log("publish status is ", this.frm.publishnow);
        let dt = this.dtPubDate;
        let uptoDt = this.dtPubUptoDate;
        let hr = 0;
        let mi = 0;
        if ( this.frm.publishnow ) {
            if ( dt < new Date())
                this.publishmsg = "Your form is published on " + this.frmSrv.getFormatedDate( dt );
            else
                this.publishmsg = "Your form will be published on " + this.frmSrv.getFormatedDate( dt );
        }
        else {
            if ( dt > new Date()){
                this.publishmsg = "Your form will be published on " + this.frmSrv.getFormatedDate( dt );
                this.showUptoMsg=true;
            }
            else
            {
                this.publishmsg = "Your form is not published";
                this.showUptoMsg=false;
                
            }
        }
        if(uptoDt && uptoDt>new Date())
        {
            this.publishuptomsg="Your form will be available upto "+this.frmSrv.getFormatedDate(uptoDt);
        }

    }
    copyURL() {
        const selBox = document.createElement( 'textarea' );
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = this.pubURL;
        document.body.appendChild( selBox );
        selBox.focus();
        selBox.select();
        document.execCommand( 'copy' );
        document.body.removeChild( selBox );
    }
    openNT() {
        window.open( this.pubURL, "_blank" );
    }

    setUptoTime( ev: any ) {
        const amazingTimePicker = this.atp.open();
        amazingTimePicker.afterClose().subscribe( time => {
            this.selectedUpToTime = time;
            this.frm.publishuptotime = time;


        } );
    }
    saveForm() {
        console.log( "123123123--savingformdata-->", this.frm )
        const saveFormObj = this.frmSrv.saveForm( this.frm, this.formID )
            .subscribe( response => {
                this.formID = response.data;
                //                  this.showNotification('top','center','Form saved successfully','s');
                console.log( "In form componenet form link0 is ", this.formID );
                this.frmSrv.showNotification('top','center','Settings saved successfully','s');
                
            } );

    }
    

}
