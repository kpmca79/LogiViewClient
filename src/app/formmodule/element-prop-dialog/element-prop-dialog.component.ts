import { Component, OnInit } from '@angular/core';
import {  Inject } from '@angular/core';
// tslint:disable-next-line:import-spacing
import { MAT_DIALOG_DATA } from  '@angular/material';
import { SubField } from "app/model/SubField"; 

@Component({
  selector: 'app-element-prop-dialog',
  templateUrl: './element-prop-dialog.component.html',
  styleUrls: ['./element-prop-dialog.component.css']
})
export class ElementPropDialogComponent implements OnInit {

    modalTitle: string;
    modalMessage: String;
    selectedValue: String;
    options:String[];
    valData = [];
    subfields:SubField[];
    reqvalidation:string[];
    editField: string;
    selectedValidations: string[];
     dropdownSettings = {};
    data1: any = {fname: '',title:'', message: '', options:'',validation:'',required:'',type:'',
            minlen:0,maxlen:64,selectedValidations:'None',reqvalidation:'',frmtitle:'',selectedColor:'',
            color:'',checked:false,disabled:false,frmstatus:'',selectedDate:'',subfield:''
    };
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.modalTitle = data.title;
    this.reqvalidation=data.reqvalidation;
    this.modalMessage = data.message;
    this.data1 = data;
    this.subfields=data.subfield;
    console.log('data1------>',this.data1);
     this.options=data.options;
        
//        console.log('444444444--', this.options);
     }

  ngOnInit() {
      /* this.dropdownSettings = { 
                                  singleSelection: false, 
                                  text:"Select Val",
                                //   selectAllText:'Select All',
                                //   unSelectAllText:'UnSelect All',
                                  enableSearchFilter: false
                                  
                                  
                                  ,
                                //   classes:"myclass custom-class"
                                };*/
                               this.dropdownSettings = { 
                                  singleSelection: false, 
                                  text:"Select Countries",
                                  selectAllText:'Select All',
                                  unSelectAllText:'UnSelect All',
                                  enableSearchFilter: false,
                                  classes:"myclass custom-class"
                                };  
                                let i=0;
                                this.valData.push({"value":0,"viewValue":'None'})
                                if(this.data1.validation)
                                {
                                    this.data1.validation.forEach(element => {
                                    i++;
                                    this.valData.push({"value":i,"viewValue":element})
                                    });
                                }
                                if(this.options)
                                {    
                                    this.options.forEach(element => {
                                    console.log('5555555-->',element);
                                    });
                                }
  }
   updateList(id: number, property: string, event: any) {
      const editField = event.target.textContent;
      this.options[id] = editField;
    }

   add()
   {
       console.log('adding option '+this.options.length);
       const op = 'Option '+(this.options.length+1);
       this.options.push(op);
   }
    remove(id: any) {

        console.log('removing ',id)
        if(this.options.length>1)
            this.options.splice(id, 1);
     
    }

    changeValue(id: number, property: string, event: any) {
      this.editField = event.target.textContent;
    }
    
   






     onItemSelect(item:any){
        console.log(item);
        console.log(this.selectedValidations);
    }
    OnItemDeSelect(item:any){
        console.log(item);
        console.log(this.selectedValidations);
    }
    onSelectAll(items: any){
        console.log(items);
    }
    onDeSelectAll(items: any){
        console.log(items);
    }
  
}
