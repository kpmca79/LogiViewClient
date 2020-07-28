import { Component, OnInit, Input } from '@angular/core';
import { Form } from "app/model/Form";
import { FormField } from "app/model/FormField";
import { MessagingService } from "app/services/messaging.service";
import {FormService} from   "app/services/form.service";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { FormControl } from "@angular/forms";

interface WeekDay {
    day: string;
    value:string;
   
}
@Component({
  selector: 'datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})

export class DatepickerComponent implements OnInit {

  @Input() frm:Form;
  @Input() actvieFormField:FormField;
  icons;
  daysControl;
  weekDays:WeekDay[]=[ {day:'Sunday',value:'0'},
                       {day:'Monday',value:'1'},
                       {day:'Tuesday',value:'2'},
                       {day:'Wednesday',value:'3'},
                       {day:'Thursday',value:'4'},
                       {day:'Friday',value:'5'},
                       {day:'Saturday',value:'6'},
                       
                     ]
  
  operator:String[]=['=','!=','Contains','!Contains','Starts with','!Starts with','Ends with','!Ends with','>','>=','<','<=','Specified','!Specified'];
  days='0,6';  
    constructor(private mService: MessagingService,private frmSrv :FormService) { }
  ngOnInit(): void {
      this.icons=this.frmSrv.getMatIcons();
     let arr:string[]=[];
      this.daysControl = new FormControl();
      if(this.actvieFormField.excludeDays)
          this.actvieFormField.excludeDays.split(',').forEach(d=>{
              if(d)arr.push(d);
              this.daysControl.setValue(arr);
              
          });
      console.log('Init called current form value=',this.daysControl.value);
      if(!this.actvieFormField.excludeDays)
          this.daysControl = new FormControl();
      this.daysControl.valueChanges.subscribe(val=>{
          this.actvieFormField.excludeDays='';
          val.forEach(v=>{
              this.actvieFormField.excludeDays+=v+','
              let msg = { id:'dayFilter',field:this.actvieFormField};
              this.mService.produce(msg);
          })
      })
  }

  openCloseRightPanel()
  {
      let obj:any={id:'close'}
      console.log("9999999999999999999999999999")
      this.mService.produce(obj);
  }
  setMinDate( type: string, event: MatDatepickerInputEvent<Date> ) {
      //      this.setClass();
      console.log("Date For Min date called setmindate, event=",event);
      
      this.actvieFormField.mindate=event.value;
      
  }
  setMaxDate( type: string, event: MatDatepickerInputEvent<Date> ) {
      //      this.setClass();
      console.log("Date For Max date called setMAxdate, event=",event);
      this.actvieFormField.maxdate=event.value;
      
  }
//  setDates()
//  {
//      if(this.actvieFormField.onlypast)
//      {
//          let  dt = new Date();
//          if(this.actvieFormField.excludePresent)
//              dt.setDate(dt.getDate()-1);
//          this.actvieFormField.maxdate=new Date();
//          this.actvieFormField.maxdate.setDate(dt.getDate());
//      }
//      if(this.actvieFormField.onlyfuture)
//      {
//          let  dt = new Date();
//          if(this.actvieFormField.excludePresent)
//              dt.setDate(dt.getDate()+1);
//          this.actvieFormField.mindate=new Date();
//          this.actvieFormField.mindate.setDate(dt.getDate());
//      }
//  }
}
