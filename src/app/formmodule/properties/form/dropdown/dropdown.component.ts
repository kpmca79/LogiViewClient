import { Component, OnInit, Input } from '@angular/core';
import { Form } from "app/model/Form";
import { FormField } from "app/model/FormField";
import { MessagingService } from "app/services/messaging.service";
import {FormService} from   "app/services/form.service";

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  @Input() frm:Form;
  @Input() actvieFormField:FormField;
  icons;
  tmpOptions;
  multiLevel=false;
  operator:String[]=['=','!=','Contains','!Contains','Starts with','!Starts with','Ends with','!Ends with','>','>=','<','<=','Specified','!Specified'];
    
    constructor(private mService: MessagingService,private frmSrv :FormService) { }
  ngOnInit(): void {
      this.icons=this.frmSrv.getMatIcons();
      this.tmpOptions=this.arrTostrOptions(this.actvieFormField.selOptions);
      if(this.actvieFormField.selOptions)
          this.actvieFormField.selOptions.forEach(val=>{val.strSubOps=this.arrTostrSubOptions(val.subOps)});
  }
  arrTostrOptions(arr)
  {
      let strOptions="";
      if(arr)
      arr.forEach(val=>{strOptions+=val.name+"\n";})
      return strOptions;
  }
  arrTostrSubOptions(arr)
  {
      let strOptions="";
      if(arr)
      arr.forEach(val=>{strOptions+=val+"\n";})
      return strOptions;
  }
  textareaContentChange()
  {
      let optionVal=[];
      if(this.tmpOptions)
         optionVal=this.tmpOptions.split('\n');
      this.actvieFormField.selOptions=[];
      optionVal.forEach(val=>{
          if(val)
          {
              val=val.trim();
              this.actvieFormField.selOptions.push({name:val,subOps:null,strSubOps:null});
          }
      })
      
  }
  
  suboptTextareaContentChange(grpOpt)
  {
      console.log("ffffffff===>",grpOpt);
      let optionVal=[];
      if(grpOpt.strSubOps)
          optionVal=[]=grpOpt.strSubOps.split('\n')
      grpOpt.subOps=[];
      optionVal.forEach(val=>{
          if(val)
          {
              val=val.trim();
              grpOpt.subOps.push(val);
          }
      })
//      if(this.actvieFormField.selOptions)
//          this.actvieFormField.selOptions.forEach(val=>{
//              if(val.name==grpOpt.name)
//                  val.
//          });
      console.log("ffffffff===>",grpOpt);
         
  }
  multiLevelChk()
  {
      this.actvieFormField.dropDownMultiLevel=true;
      
  }
  singleLevelCkh()
  {
      this.actvieFormField.dropDownMultiLevel=false;
  }
  openCloseRightPanel()
  {
      let obj:any={id:'close'}
      console.log("9999999999999999999999999999")
      this.mService.produce(obj);
  }
}
