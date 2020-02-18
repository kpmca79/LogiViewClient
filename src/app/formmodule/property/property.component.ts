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
  fontSizeList=[8,9,10,11,12,14,116,18,20,22,24,26,28]
  fontSize=15;
  fontColor="#000000";
  supportedFonts=['cursive','sans-serif','sarif','monospace','Courier New','Arial',
                  'Times New Roman','Georgia','impact','Comic Sans MS',
                  'Trebuchet MS','Helvetica','Garamond','Verdana','Bookman Old Style','Palatino','Courier'];
  selectedFont='Roboto,"Helvetica Neue",sans-serif';                

  bgFile;
  fileID;
  srcResult;
  opacity;
  btnFC="#000000";
  btnBGC="#00ff00";
  btnWidth='0.0';
 
  
  imageURL: String="";
  isDarkTheme:boolean=false;
  chgEvent:any = {"safeBgURL":"","opacity":"", "bgImage":"","theme":false,width:600,"frmStyle":"","frmbtnStyle":""};
  
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
  btnStyleChange(event:any,element:string)
  {
    
      if(element=='fc'){
          this.frm.btnStyle=this.styleParse(this.frm.btnStyle, 'fntColor', this.btnFC);
          this.chgEvent.frmbtnStyle=this.frm.btnStyle;
          this.mService.produce(this.chgEvent);
      }
      else if(element=='bgc'){
          this.frm.btnStyle=this.styleParse(this.frm.btnStyle, 'bgColor', this.btnBGC);
          this.chgEvent.frmbtnStyle=this.frm.btnStyle;
          this.mService.produce(this.chgEvent);
      }
      else if(element=='size'){
          this.frm.btnStyle=this.styleParse(this.frm.btnStyle, 'flexgrow', this.btnWidth);
          this.chgEvent.frmbtnStyle=this.frm.btnStyle;
          this.mService.produce(this.chgEvent);
      }
      console.log("button size ",this.btnWidth)
      
          
  }
  styleParse(src:string,element:string,value:string):string
  {
      let dest="";
      let colorRegExp=/color:#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3});/gi;
      let bgcRegExp=/background:#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3});/gi;
      let flxGrwRegExp=/flex-grow:([015.]{3});/gi;
      
      let fntSizeRegExp=/font-size:[0-9][0-9]px;/gi;
      let fntFamilyRegExp=/font-family:.*?(?=;)/gi;
      

      
      if(!src)
          src="";
      console.log("Before parsing style=", src);
      switch(element)
      {
          case 'flexgrow':{
              if(!src.match(flxGrwRegExp))
                  dest=src+"flex-grow:"+value+";";
              else
                  dest=src.replace(flxGrwRegExp,"flex-grow:"+value+";");
              break;
          }
          case 'fntColor':{
              if(!src.match(colorRegExp))
                  dest=src+"color:"+value+";";
              else
                  dest=src.replace(colorRegExp,"color:"+value+";");
              break;
          }
          case 'fntSize':{
              if(!src.match(fntSizeRegExp))
                  dest=src+"font-size:"+value+"px;";
              else
                  dest=src.replace(fntSizeRegExp,"font-size:"+value+"px;");
              break;
          }
          case 'fntFamily':{
              if(!src.match(fntFamilyRegExp))
                  dest=src+"font-family:"+value+";";
              else
                  dest=src.replace(fntFamilyRegExp,"font-family:"+value);
              break;
          }
          case 'bgColor':{
              if(!src.match(bgcRegExp))
                  dest=src+"background:"+value+";";
              else
                  dest=src.replace(bgcRegExp,"background:"+value+";");
              break;
          }
              
      }
      
      
      console.log("After parsing style=", dest);
      return dest;
  }
  fontColorChange(event:any)
  {
      this.frm.style=this.styleParse(this.frm.style, 'fntColor', this.fontColor);
      this.chgEvent.frmStyle=this.frm.style;
      this.mService.produce(this.chgEvent);
      
  }
  fontSizeChange(event:any)
  {
      this.frm.style=this.styleParse(this.frm.style, 'fntSize', this.fontSize+'');
      this.chgEvent.frmStyle=this.frm.style;
      this.mService.produce(this.chgEvent);
    }
  fontFamilyChange(event:any)
  {

      this.frm.style=this.styleParse(this.frm.style, 'fntFamily', this.selectedFont);
      this.chgEvent.frmStyle=this.frm.style;
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
