import { Component, OnInit, Input } from '@angular/core';
import { Form } from "app/model/Form";
import { FormField } from "app/model/FormField";
import { MessagingService } from "app/services/messaging.service";
import {FormService} from   "app/services/form.service";

@Component({
  selector: 'numberspinner',
  templateUrl: './numberspinner.component.html',
  styleUrls: ['./numberspinner.component.css']
})
export class NumberspinnerComponent implements OnInit {

  @Input() frm:Form;
  @Input() actvieFormField:FormField;
  icons;
  operator:String[]=['=','!=','Contains','!Contains','Starts with','!Starts with','Ends with','!Ends with','>','>=','<','<=','Specified','!Specified'];
    
    constructor(private mService: MessagingService,private frmSrv :FormService) { }
  ngOnInit(): void {
      this.icons=this.frmSrv.getMatIcons();
  }
  openCloseRightPanel()
  {
      let obj:any={id:'close'}
      console.log("9999999999999999999999999999")
      this.mService.produce(obj);
  }
}
