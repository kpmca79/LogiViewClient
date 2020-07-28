import { Component, OnInit, Inject } from '@angular/core';
import { FormService } from "app/services/form.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Form } from "app/model/Form";

@Component({
  selector: 'image-selection-dialog',
  templateUrl: './image-selection-dialog.component.html',
  styleUrls: ['./image-selection-dialog.component.css']
})
export class ImageSelectionDialogComponent implements OnInit {

srcResult
supportedSizeInMB = 1;
msg = "Upload file or drag and drop file here";
pubmsg = "Upload file from public URL";
imageURL1;
err = "info";
loading = false;
imgURL="/api/file/"
frm:Form;
selectedTab=0;
  constructor(private stdSrv: FormService,
          @Inject( MAT_DIALOG_DATA ) public data: any,
          private dialogRef: MatDialogRef<ImageSelectionDialogComponent>){ 
      
  }

  ngOnInit(): void {
      this.frm=this.data.frm;
      if(this.frm&&this.frm.formImages && this.frm.formImages.length>0)
      {
          
          this.selectedTab=2;
      }
  }
  onFileSelected() {
      const inputNode: any = document.querySelector( '#bgFile' );
      let size = 0
      //button loading reference https://medium.com/@dkreider09/how-to-add-a-spinner-to-an-angular-material-button-the-simplest-way-ever-69e2f7005f29
      this.loading = true;
      if ( typeof ( FileReader ) !== 'undefined' ) {
          const reader = new FileReader();
          reader.onload = ( e: any ) => { this.srcResult = e.target.result; };
          reader.readAsArrayBuffer( inputNode.files[0] );
          size = inputNode.files[0].size / 1014;
          if ( size > 1024 ) {
              this.msg = "File size greater than 1 MB is not allowed";
              this.err = "info err";
              this.loading = false;
              return;
          }
          else {
              this.msg = "Uploading file...";
              this.err = "info prog";
          }
          const studentsObservable = this.stdSrv.uploadResource( inputNode.files[0] ).subscribe(
              dt => {
                  let result: any = dt;
                  this.data.fileid = result.fileid;
                  //                      this.notifyBGImageChange(result.fileid)
                  console.log( 'File uploaded onFileSelected successfully ID is = ', this.data.fileid );
                  let data:any ={'fileid':this.data.fileid}
                  this.dialogRef.close( { 'data': data } );
              },
              error => {
              this.msg = error
                  this.err = "info err";
              } );

      }
  }
  useImage(imageId)
  {
      let data:any ={'fileid':imageId,'frm':this.frm}
      this.dialogRef.close( { 'data': data } );
      
      
  }
  removeMe(imageID)
  {
      const index: number = this.frm.formImages.indexOf(imageID);
     if (index !== -1) 
         this.frm.formImages.splice(index, 1);
     
     
  }
  uploadFromURL() {
      console.log( this.imageURL1 );
      this.loading = true;
      this.pubmsg = "Uploading file...";
      this.err = "info prog";
      const imageObservable = this.stdSrv.downloadImage( this.imageURL1 )
          .subscribe(
          data => {
              //          console.log("Inside get data--> ",data);
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
                          if ( data ) {
                              let result: any = data;
                              let fileID = result.fileid;
                              let data1:any ={'fileid':fileID}
                              this.dialogRef.close( { 'data':data1  } );
                              this.loading = false;
                          }
                      },
                      ( err ) => { this.pubmsg = err; this.err = "info err"; this.loading = false; }
                      );
              }
              else {
                  this.pubmsg = "Not supported filetype for background image :" + fileType;
                  this.loading = false;
                  this.err = "info err";
              }
          }, ( err ) => {
              this.pubmsg = err;
              this.loading = false;
              this.err = "info err";
          } );
  }

}
