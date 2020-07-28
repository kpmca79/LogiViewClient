import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Form } from "app/model/Form";
import { FormService } from "app/services/form.service";
import { MessagingService } from "app/services/messaging.service";
import { MatIconRegistry } from "@angular/material/icon";
import { MatDialog } from "@angular/material/dialog";
import { ImageSelectionDialogComponent } from "app/formmodule/image-selection-dialog/image-selection-dialog.component";

@Component({
  selector: 'formproperty',
  templateUrl: './formproperty.component.html',
  styleUrls: ['./formproperty.component.css']
})
export class FormpropertyComponent implements OnInit {
    
    @Input() frm: Form;
    @Input() formID: String;
    @Input() type: String;
    @Input() safeBgURL: any;
    step = -1;
    fontSizeList = [8, 9, 10, 11, 12, 14, 116, 18, 20, 22, 24, 26, 28]
    fontSize = 15;
    fontColor = "#000000";
    imgURL = "/api/file/";
    clrTheme = [{ bg: '#8DE4AF', pg: '#05396B', fn: '#EDF5E0' },
    { bg: '#3FEEE7', pg: '#FC4444', fn: '#CAFAFE' },
    { bg: '#FAED25', pg: '#46344E', fn: '#9D8D8E' },
    { bg: '#64495C', pg: '#2E1115', fn: '#ADADAD' },
    { bg: '#0C0032', pg: '#3500D4', fn: '#FFFFFF' },
    { bg: '#C2B9B0', pg: '#E7717D', fn: '#C2C9CF' },
    { bg: '#C5C6C8', pg: '#202833', fn: '#66FCF1' },
    { bg: '#87C232', pg: '#618930', fn: '#FFFFFF' },
    { bg: '#A4B3B6', pg: '#44318D', fn: '#D93F87' },



    ];


    supportedFonts = ['Cursive', 'sans-serif', 'sarif', 'monospace', 'Courier New', 'Arial',
        'Times New Roman', 'Georgia', 'impact', 'Comic Sans MS',
        'Trebuchet MS', 'Helvetica', 'Garamond', 'Verdana', 'Bookman Old Style', 'Palatino', 'Courier'];
    selectedFont = 'Helvetica Neue';

    bgFile;
    fileID;
    srcResult;
    opacity;
    btnFC = "#000000";
    btnBGC = "#00ff00";
    btnWidth = '0.0';
    bgImage;
    frmBGImage;

    imageURL: String = "";
    isDarkTheme: boolean = false;
    chgEvent: any = { "safeBgURL": "", "opacity": "", "bgImage": "", "theme": false, width: 600, "frmStyle": "", "frmbtnStyle": "" };

  constructor(
          private stdSrv: FormService,
          private mService: MessagingService,
          private iconRegistry: MatIconRegistry,
          public dialog: MatDialog
          ) {  }

  ngOnInit(): void {
  }
  inpStyle( val ) {
      this.frm.inputStyle = val;
      this.mService.produce( this.frm );
  }
  openCloseRightPanel()
  {
      let obj:any={id:'close'}
      console.log("9999999999999999999999999999")
      this.mService.produce(obj);
  }
  changeColorScheme( thm ) {
      this.frm.bgColor = thm.pg;
      this.btnFC = thm.pg;
      this.fontColor = thm.fn;
      this.btnBGC = thm.fn;
      this.frm.pageBGColor = thm.bg;

      this.btnStyleChange( '', 'fc' );
      this.btnStyleChange( '', 'bgc' );
      this.notifyPageColorChange( '' );
      this.fontColorChange( '' );

  }
  removeBG( type ) {
      if ( type == 'page' )
          this.frm.bgImage = '';
      else if ( type == 'form' )
          this.frm.formBgImage = '';
      this.notifyBGImageChange( '', type );
  }
  setStep( index: number ) {
      this.step = index;
  }

  nextStep() {
      this.step++;
  }

  prevStep() {
      this.step--;
  }

  upload() {
      console.log( "upload called" );
  }
  notifyBGImageChange( newFileId: String, type ) {
      this.fileID = newFileId;
      console.log( "Not Inside remove bg" )
      if ( type == 'page' )
          this.frm.bgImage = this.fileID;
      else if ( type == 'form' )
          this.frm.formBgImage = this.fileID;
     console.log("bbbbbbbbbbbbbbbbbbbbb");
      this.mService.produce( this.frm );
  }
  notifyPageColorChange( type ) {
      this.mService.produce( this.frm );
      console.log("bbbbbbbbbbbbbbbbbbbbb");
  }

  opacityChange( event: any ) {
      this.mService.produce( this.frm );
      console.log("bbbbbbbbbbbbbbbbbbbbb");
  }
  widthChange( event: any ) {
      this.mService.produce( this.frm );
      console.log("bbbbbbbbbbbbbbbbbbbbb");
  }
  btnStyleChange( event: any, element: string ) {

      if ( element == 'fc' )
          this.frm.btnStyle = this.stdSrv.styleParse( this.frm.btnStyle, 'fntColor', this.btnFC );
      else if ( element == 'bgc' )
          this.frm.btnStyle = this.stdSrv.styleParse( this.frm.btnStyle, 'bgColor', this.btnBGC );
      else if ( element == 'size' )
          this.frm.btnStyle = this.stdSrv.styleParse( this.frm.btnStyle, 'flexgrow', this.btnWidth );
      this.mService.produce( this.frm );
      console.log("bbbbbbbbbbbbbbbbbbbbb");
      console.log( "this.frm.btnStyle= ", this.frm.btnStyle )


  }

  fontColorChange( event: any ) {
      this.frm.style = this.stdSrv.styleParse( this.frm.style, 'fntColor', this.fontColor );
      this.mService.produce( this.frm );

  }
  fontSizeChange( event: any ) {
      this.frm.style = this.stdSrv.styleParse( this.frm.style, 'fntSize', this.fontSize + '' );
      this.mService.produce( this.frm );
  }
  fontFamilyChange( event: any ) {
      this.frm.style = this.stdSrv.styleParse( this.frm.style, 'fntFamily', this.selectedFont );
      this.mService.produce( this.frm );
  }
  themeChange() {
      console.log( "theme changed ", this.isDarkTheme );
      this.frm.theme = this.isDarkTheme ? 'dark-theme' : '';

      this.mService.produce( this.frm );
  }
  uploadFromURL() {
      console.log( this.imageURL );
      const imageObservable = this.stdSrv.downloadImage( this.imageURL )
          .subscribe(
          data => {
              //        console.log("Inside get data--> ",data);
              let fileType: string = data.type;
              //type:"image/jpg"
              if ( fileType.includes( "image/" ) ) {
                  var extension = fileType.substring( fileType.indexOf( "/" ) + 1 );
                  console.log( "file extentions is ", extension );
                  var blob = new Blob( [data], { type: fileType } );
                  var fileName = "image-" + new Date().valueOf() + "." + extension;
                  console.log( "fileName is ", fileName );
                  var file = new File( [blob], fileName, { type: fileType } );
                  const uploadObservable = this.stdSrv.uploadResource( file ).
                      subscribe(
                      data => {
                          let result: any = data;
                          let fileID = result.fileid;
                          console.log( "File uploaded successfully ", fileID );
                          //                      this.notifyBGImageChange(fileID);
                      },
                      ( err ) => { console.log( "Not able to upload file" ); }
                      );
              }
              else {
                  console.log( "Not supported filetype for background image :", fileType );
              }
          }, ( err ) => {
              console.log( "Inside uploadFromURL error-->", err );
          } );
  }
  onFileSelected() {
      const inputNode: any = document.querySelector( '#file' );

      if ( typeof ( FileReader ) !== 'undefined' ) {
          const reader = new FileReader();

          reader.onload = ( e: any ) => {
              this.srcResult = e.target.result;
          };

          reader.readAsArrayBuffer( inputNode.files[0] );
          //        reader.readAsDataURL(this.bgFile);
          const studentsObservable = this.stdSrv.uploadResource( inputNode.files[0] ).subscribe(
              data => {
                  let result: any = data;
                  //                    this.notifyBGImageChange(result.fileid)
                  console.log( 'File uploaded successfully ID is = ', this.fileID );
              } );

      }
  }
  selectImage( ref: ElementRef, type ) {
      const bodyRect = document.body.getBoundingClientRect();
      console.log( "@@@@@@@@@@@@@@@@@@@@@@@ ", ref );
      console.log( "@@@@@@@@@@@@@@@@@@@@@@@ ", bodyRect );
      let data: any={fileid:'',frm:this.frm}
      let fileid = 'xxx';
      data.frm=this.frm;
      data.fileid='xxx';
      const dialogRef = this.dialog.open( ImageSelectionDialogComponent, {
          position: { right: '16px', top: '90px' },
          width: '439px',
          data:data
      } );
      dialogRef.afterClosed().subscribe( result => {
          if ( result ) {
              console.log( "Setting background------>", result.data );
              if ( type == 'form' )
                  this.frm.formBgImage = result.data.fileid;
              else if ( type == 'page' )
                  this.frm.bgImage = result.data.fileid;
              if(this.frm.formImages.indexOf(result.data.fileid)==-1)
                    this.frm.formImages.push(result.data.fileid);
              if(result.data.frm)
                  this.frm=result.data.frm;
              this.frm.formImages.length
              this.notifyBGImageChange( result.data.fileid, type );

          }
      } );
  }


}
