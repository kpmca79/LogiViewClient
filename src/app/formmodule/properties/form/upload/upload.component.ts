import { Component, OnInit, Input } from '@angular/core';
import { Form } from "app/model/Form";
import { FormField } from "app/model/FormField";
import { MessagingService } from "app/services/messaging.service";
import {FormService} from   "app/services/form.service";
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
  interface FileType {
    value: string;
    types:string;
    checked:boolean;
    
     
  }

  interface FileTypeGroup {
    disabled?: boolean;
    name: string;
    filetype: FileType[];
  }
@Component({
  selector: 'upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @Input() frm:Form;
  @Input() actvieFormField:FormField;
  icons;
  str1:string='application/pdf,.pdf';
  
//  selectedTypes:string[]=['PDF'];
  
  fileTypeControl = new FormControl();
  
  fileTypeGroups: FileTypeGroup[] = [
    {
      name: 'Documents',
      filetype: [
       
        {value: 'PDF', types:'application/pdf,.pdf',checked:false},
        {value: 'Word Document',types:'.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',checked:false},
        {value: 'Excel Sheet',types:'.xls,.xlsx,application/vnd.ms-excel',checked:false},
        {value: 'Powerpoint Presentation',types:'.ppt, .pptx',checked:false},
        {value: 'CSV',types:'.csv',checked:false},
        {value: 'Text',types:'text/plain,.txt',checked:false}
      ]
    },
    {
      name: 'Images',
      filetype: [
        {value: 'PNG', types:'image/png',checked:false},
        {value: 'GIF', types:'image/gif',checked:false},
        {value: 'JPEG', types:'image/jpeg',checked:false}
      ]
    }
  ];

  
  
  
  operator:String[]=['=','!=','Contains','!Contains','Starts with','!Starts with','Ends with','!Ends with','>','>=','<','<=','Specified','!Specified'];
    
    constructor(private mService: MessagingService,private frmSrv :FormService) { }
  ngOnInit(): void {
      let ar:string[]=[];
      this.icons=this.frmSrv.getMatIcons();
  
      this.fileTypeGroups.forEach(ftg=>{
          ftg.filetype.forEach(ft=>{
              if(this.actvieFormField.acceptFileTypes && this.actvieFormField.acceptFileTypes.includes(ft.types))
              {
                  ar.push(ft.types);
                  this.fileTypeControl.setValue(ar);
              }
          });
      });
      this.fileTypeControl.valueChanges.subscribe(val=>{
          this.actvieFormField.acceptFileTypes=''
          val.forEach(v=>{this.actvieFormField.acceptFileTypes+=v+','})
      })
      
  }
  
  openCloseRightPanel()
  {
      let obj:any={id:'close'}
      console.log("9999999999999999999999999999")
      this.mService.produce(obj);
  }
  fileTypeChange(event)
  {
      console.log(event);
  }
}
