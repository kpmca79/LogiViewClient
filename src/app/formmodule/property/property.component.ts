import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core";
import { Form } from "../..//model/Form";
import { FormService } from "../../services/form.service";
import { DomSanitizer } from "@angular/platform-browser";
import { Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { MessagingService } from "../../services/messaging.service";
import { MatIconRegistry } from "@angular/material/icon";


@Component({
  selector: 'form-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
  @Input() frm:Form;  
  @Input() formID:String;
  @Input() type:String;
  @Input() safeBgURL:any;
 
  step = -1;

  bgFile;
  fileID;
  srcResult;
  opacity;
  
  imageURL: String="";
  isDarkTheme:boolean=false;
  chgEvent:any = {"safeBgURL":"","opacity":"", "bgImage":"","theme":false,width:600};
  
  constructor(private stdSrv: FormService, 
              private sanitizer: DomSanitizer,
              private mService: MessagingService,
              private iconRegistry: MatIconRegistry) {
      iconRegistry.addSvgIcon(
              'ImgUpload',
              sanitizer.bypassSecurityTrustResourceUrl('assets/icon/image-upload.svg'));
     
  }

  ngOnInit() {
   
      
   
  }
  setStep(index: number) {
      this.step = index;
    }

    nextStep() {
      this.step++;
    }

    prevStep() {
      this.step--;
    }
  upload()
  {
      console.log("upload called");
  }
  onFileSelected() {
      const inputNode: any = document.querySelector('#file');

      if (typeof (FileReader) !== 'undefined') {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.srcResult = e.target.result;
        };

        reader.readAsArrayBuffer(inputNode.files[0]);
//        reader.readAsDataURL(this.bgFile);
       
        const studentsObservable = this.stdSrv.uploadResource(inputNode.files[0]).subscribe(
                data=>{
                    let result:any = data;
                    this.notifyBGImageChange(result.fileid)
                    console.log('File uploaded successfully ID is = ', this.fileID);
                    
                  
                });
                
      }
    }
  notifyBGImageChange(newFileId:String)
  {
      this.fileID=newFileId;
      this.frm.bgImage= this.fileID;
      this.safeBgURL = this.sanitizer.bypassSecurityTrustStyle("url(/api/file/"+ this.fileID+")");
      this.safeBgURL = "/api/file/"+ this.fileID;
      this.chgEvent.safeBgURL= this.safeBgURL;
      this.chgEvent.opacity=this.frm.opacity;
      this.chgEvent.fileID= this.fileID;
      this.mService.produce(this.chgEvent);
  }
  opacityChange(event:any)
  {
      
      if(this.safeBgURL)
          this.chgEvent.safeBgURL= this.safeBgURL;
      this.chgEvent.opacity=this.frm.opacity
      if(this.fileID)
          this.chgEvent.fileID= this.fileID;
      this.chgEvent.fileID=null;
      this.mService.produce(this.chgEvent);
      
    }
  widthChange(event:any)
  {
      
      if(this.safeBgURL)
          this.chgEvent.safeBgURL= this.safeBgURL;
      this.chgEvent.width=this.frm.formwidth;
      this.chgEvent.opacity=this.frm.opacity
      if(this.fileID)
          this.chgEvent.fileID= this.fileID;
      this.chgEvent.fileID=null;
      this.mService.produce(this.chgEvent);
    }
  themeChange()
  {
      console.log("theme changed ", this.isDarkTheme);
      this.chgEvent.theme=this.isDarkTheme;
      this.chgEvent.fileID=null;
      this.mService.produce(this.chgEvent);
  }
  uploadFromURL()
  {
      console.log(this.imageURL);
      const imageObservable=this.stdSrv.downloadImage(this.imageURL)
      .subscribe(
              data=>{   
//        console.log("Inside get data--> ",data);
          let fileType: string=data.type;
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
                      this.notifyBGImageChange(fileID);
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
  
}
