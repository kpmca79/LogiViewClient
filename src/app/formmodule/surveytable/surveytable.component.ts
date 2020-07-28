import { Component, OnInit, Input, ViewChild,HostListener } from '@angular/core';
import { Form } from "app/model/Form";
import { FormField } from "app/model/FormField";
import { MessagingService } from "app/services/messaging.service";
import {FormService} from   "app/services/form.service";
import { SafeStyle, DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'surveytable',
  templateUrl: './surveytable.component.html',
  styleUrls: ['./surveytable.component.css']
})
export class SurveytableComponent implements OnInit {

  @Input() frm:Form;
  @Input() actvieFormField:FormField;
  constructor(private mService: MessagingService,private frmSrv :FormService, private _sanitizer: DomSanitizer) { }
  ngOnInit(): void {
      if(!this.actvieFormField.survey.options)
      {
          this.actvieFormField.survey={ options:[   {name:'Vary Satisfied',value:'Vary Satisfied',values:[]},
                                                {name:'Satisfied',value:'Satisfied',values:[]},
                                                {name:'OK',value:'OK',values:[]},
                                                {name:'Disatisfied',value:'Disatisfied',values:[]},
                                                {name:'Very Disatisfied',value:'Very Disatisfied',values:[]},
                                                
                                             
                                             
                                             ], 
                                    questions:[
                                                   {name:'Staff Helpfulness',selectedValue:''},
                                                   {name:'Staff Friendlyness',selectedValue:''},
                                                   {name:'Speep of Service',selectedValue:''},
                                                   {name:'Availability of Staff',selectedValue:''},
                                              ]  
      		                      };    
          
      }
      
  }
  sanitizeHTML( style: string ): SafeStyle {
      return this._sanitizer.bypassSecurityTrustStyle( style );
  }
 

  
  
}
