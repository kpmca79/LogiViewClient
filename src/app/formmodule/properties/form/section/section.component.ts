import { Component, OnInit, Input } from '@angular/core';
import { Form } from "app/model/Form";
import { FormField } from "app/model/FormField";
import { MessagingService } from "app/services/messaging.service";
import {FormService} from   "app/services/form.service";

@Component({
  selector: 'section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  @Input() frm:Form;
  @Input() actvieFormField:FormField;
  icons;
  color='inherit';
  fontstyle;
  fontsize='inherit';
  borderthickness='1px';
  bordercolor='ineherit';
  style;
  fsize=18+'';
  bsize=1+'';
  operator:String[]=['=','!=','Contains','!Contains','Starts with','!Starts with','Ends with','!Ends with','>','>=','<','<=','Specified','!Specified'];
    
    constructor(private mService: MessagingService,private frmSrv :FormService) { }
  ngOnInit(): void {
      
      if(this.actvieFormField)
      {
          let val=this.frmSrv.getStyleValue(this.actvieFormField.sectionStyle, 'fntColor');
          
          this.color=val?val:'inherit'
              
          val=this.frmSrv.getStyleValue(this.actvieFormField.sectionStyle, 'borderColor');
          this.bordercolor=val?val:'inherit'
              
              
          val=this.frmSrv.getStyleValue(this.actvieFormField.sectionStyle, 'fntSize');
          this.fontsize=val?val:'inherit';
           val=this.frmSrv.getStyleValue(this.actvieFormField.sectionStyle, 'borderwidth');
          this.borderthickness=val?val:'1px';
          if(this.borderthickness!='1px')
              this.bsize=this.borderthickness.replace('px', '');
          if(this.fontsize!='inherit')
              this.fsize=this.fontsize.replace('px', '');
      }
          
      
  }
  openCloseRightPanel()
  {
      let obj:any={id:'close'}
      console.log("9999999999999999999999999999")
      this.mService.produce(obj);
  }
  fontColorChange($event)
  {
      this.color=$event;
      this.actvieFormField.sectionStyle=this.getStyle();
      
      
  }
  borderColorChange($event)
  {
      this.bordercolor=$event;
      console.log("$event=",$event);
      console.log("$style before=",this.actvieFormField.sectionStyle);
      this.actvieFormField.sectionStyle=this.getStyle();
      console.log("$style after=",this.actvieFormField.sectionStyle);
      console.log("  ");
      console.log("  ");
  }
  fontSizeChange($event)
  {                                 
      this.fontsize=$event.target.value+'px';
      this.actvieFormField.sectionStyle=this.getStyle();
      
      
  }
  borderSizeChange($event)
  {
     
      this.borderthickness=$event.target.value+'px';
      this.actvieFormField.sectionStyle=this.getStyle();
      
  }

  
  getStyle():string
  {
      return this.style="color:"+this.color+";font-size:"+this.fontsize+";border-width:"+this.borderthickness+";border-color:"+this.bordercolor+";margin-bottom:20px;"
  }
}
