import { Component, OnInit, Input } from '@angular/core';
import { Form } from "app/model/Form";
import { FormField } from "app/model/FormField";
import { MessagingService } from "app/services/messaging.service";
import {FormService} from   "app/services/form.service";

@Component({
  selector: 'survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  @Input() frm:Form;
  @Input() actvieFormField:FormField;
  icons;
  tmpOptions;
  tmpQuestions;
  multiLevel=false;
  operator:String[]=['=','!=','Contains','!Contains','Starts with','!Starts with','Ends with','!Ends with','>','>=','<','<=','Specified','!Specified'];
    
    constructor(private mService: MessagingService,private frmSrv :FormService) { }
  ngOnInit(): void {
      this.icons=this.frmSrv.getMatIcons();
      this.tmpOptions=this.arrTostrOptions(this.actvieFormField.survey.options);
      this.tmpQuestions=this.arrTostrOptions(this.actvieFormField.survey.questions);
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
  questionChange()
  {
      this.actvieFormField.survey.questions
      let optionVal=[];
      if(this.tmpQuestions)
         optionVal=this.tmpQuestions.split('\n');
      this.actvieFormField.survey.questions=[];
      optionVal.forEach(val=>{
          if(val)
          {
              val=val.trim();
              this.actvieFormField.survey.questions.push({name:val,selectedValue:''});
          }
      })
      
  }
  optionsChange()
  {
      this.actvieFormField.survey.options
      let optionVal=[];
      if(this.tmpOptions)
         optionVal=this.tmpOptions.split('\n');
      this.actvieFormField.survey.options=[];
      optionVal.forEach(val=>{
          if(val)
          {
              val=val.trim();
              this.actvieFormField.survey.options.push({name:val,value:val,values:null});
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
