import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient, HttpResponse, HttpRequest, 
         HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { of } from 'rxjs/observable/of';
import { catchError, last, map, tap } from 'rxjs/operators';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { FormField } from "app/model/FormField";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  animations: [
               trigger('fadeInOut', [
                     state('in', style({ opacity: 100 })),
                     transition('* => void', [
                           animate(300, style({ opacity: 0 }))
                     ])
               ])
         ]
})
export class FileUploadComponent implements OnInit {

    @Input() field;
    /** Link text */
    @Input() text = 'Upload';
    /** Name used in form which will be sent in HTTP request. */
    @Input() param = 'file';
    /** Target URL for file uploading. */
   
    @Input() target = '/api/file2';
    /** File extension that accepted, same as 'accept' of <input type="file" />. 
        By the default, it's set to 'image/*'. */
    @Input() accept = 'image/*';
    
    @Input() maxSizeMB=2;
    @Input() maxFiles=2;
    
    @Input() styleparam = '';
    @Input() fieldName = '';
    @Input() iconName='';
    @Input() hint='';
    @Input() acceptFileTypes='';
    /** Allow you to add handler after its completion. Bubble up response text from remote. */
    @Output() complete = new EventEmitter<string>();
    limitmsg='';
    
    clrStyle="";
    files: Array<FileUploadModel> = [];

    constructor(private _http: HttpClient,
            private _sanitizer: DomSanitizer) { }

    ngOnInit() {
        if(!this.iconName)
            this.iconName='file_upload';
    }
    sanitizeHTML(style:string): SafeStyle {
        return this._sanitizer.bypassSecurityTrustStyle(style);
    }
    

    onClick() {
          const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
          if(this.files.length>=this.maxFiles)
          {   this.limitmsg="Limit Reached: Only "+this.maxFiles+" file/files uploads are allowed."
              return;
          }
          fileUpload.onchange = () => {
                for (let index = 0; index < fileUpload.files.length; index++) {
                    if(this.files.length<this.maxFiles){  
                            const file = fileUpload.files[index];
                            this.files.push({ data: file, state: 'in', 
                            inProgress: false, progress: 0, canRetry: false, canCancel: true, success:false,fail:false,msg:'' });
                       }
                    else if(this.files.length>=this.maxFiles)
                        this.limitmsg="Limit Reached: Only "+this.maxFiles+" file/files uploads are allowed."
                }
                this.uploadFiles();
          };
          fileUpload.click();
    }

    cancelFile(file: FileUploadModel) {
        console.clear();
        console.log("ccccccaaancelFFFFFFFEEEEEEE=",file);
        if(file.data)
            this.removeFileFromParent(file.data);
        if(file.sub)
            file.sub.unsubscribe();
          this.removeFileFromArray(file);
          if(this.files.length<this.maxFiles)
                  this.limitmsg='';
    }
    
    removeFileFromParent(f:File){
         let removF={name:f.name,state:'remove',fieldName:this.fieldName}
          this.complete.emit(JSON.stringify(removF));         
    }
                  

    retryFile(file: FileUploadModel) {
          this.uploadFile(file);
          file.canRetry = false;
    }

    private uploadFile(file: FileUploadModel) {
          const fd = new FormData();
          fd.append(this.param, file.data);
          

          const req = new HttpRequest('POST', this.target, fd, {
                reportProgress: true
          });

          file.inProgress = true;
          file.sub = this._http.request(req).pipe(
                map(event => {
                      switch (event.type) {
                            case HttpEventType.UploadProgress:
                                  file.progress = Math.round(event.loaded * 100 / event.total);
                                  break;
                            case HttpEventType.Response:
                                  return event;
                      }
                }),
                tap(message => { }),
                last(),
                catchError((error: HttpErrorResponse) => {
                      file.inProgress = false;
                      file.canRetry = true;
                      file.fail=true;
                      file.msg=error.status+' '+error.statusText;
                      return of(`${file.data.name} upload failed.`);
                })
          ).subscribe(
                (event: any) => {
                      if (typeof (event) === 'object') {
//                            this.removeFileFromArray(file);
                          file.success=true;
                          let resp={id:"",name:"",type:"",fieldName:''};
                          resp.id=event.body.fileid;
                          resp.name=file.data.name
                          resp.type=file.data.type;
                          resp.fieldName=this.fieldName;
                          this.complete.emit(JSON.stringify(resp));
//                          this.complete.emit(this.files);
                      }
                }
          );
    }

    private uploadFiles() {
          const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
          fileUpload.value = '';
          this.files.forEach(f=>
          {
              let size =(f.data.size/1024.00)/1024.00;
              if(f.data.type.includes("png"))
              {
                  f.inProgress = false;
                  f.canRetry = false;
                  f.fail=true;
                  f.msg='File type of '+f.data.type+' is not allowed';
                  f.success=true;
                  console.log("file name is ",f.data.name);
                  console.log("file type is ",f.data.type);
                  console.log("file size is ",f.data.size);
                  console.log("file size is ",f.data.size);
              }
              if(size>this.maxSizeMB)
              {
                  f.inProgress = false;
                  f.canRetry = false;
                  f.fail=true;
                  f.msg='Maximum file size allowed is '+parseFloat(this.maxSizeMB+'').toFixed(2)+" MB, current file size is "+parseFloat(size+'').toFixed(2)+" MB";
                  f.success=true;
                  console.log("file name is ",f.data.name);
                  console.log("file type is ",f.data.type);
                  console.log("file size is ",f.data.size);
                  console.log("file size in mb ",size+" MB");
              }
          })
          
          
          this.files.forEach(file => {
                if(!file.success)
                  this.uploadFile(file);
          });
    }

    private removeFileFromArray(file: FileUploadModel) {
          const index = this.files.indexOf(file);
          
          if (index > -1) {
                let currFile=this.files[index];
                this.files.splice(index, 1);
               
          }
    }
 

}

export class FileUploadModel {
    data: File;
    state: string;
    inProgress: boolean;
    progress: number;
    canRetry: boolean;
    canCancel: boolean;
    success: boolean;
    fail:boolean;
    msg:string;
    sub?: Subscription;
}
