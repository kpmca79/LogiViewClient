import { Component, OnInit, ViewChild } from '@angular/core';
import { FormService } from "../../services/form.service";
import { Form } from "../../model/Form";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import { FormtypeDialogComponent } from '../../formmodule/formtype-dialog/formtype-dialog.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { Route, Router,ActivatedRoute } from "@angular/router";

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-form-inbox',
  templateUrl: './form-inbox.component.html',
  styleUrls: ['./form-inbox.component.css']
})
export class FormInboxComponent implements OnInit {

    formID: String;
    isLoaded: boolean = false;
    title = 'mattab';
    responseData: any[];
    leftNavOpen:boolean=true;
    charts
    colProperty: any[] = [];
    rows=[1,2,3,4,5,6,7,8,9];
    dispColumns: string[] = [];
    message = "this is from parent"
    chartData: any[] = []; 
    hidencols: string[] = ['resp_country','resp_state','resp_city','latitude','longitude','IpAddress','resTime'];
    @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
    
    frm: Form;
    currentResp;
    dispColNew:string[]=[];
    
    colors:string[]=['#ffc0e9','#fbebb5','#D3FED4','#D0F0FE','#EDE2FE','#FEE2D5','#C2F5E9'];
//    colors:string[]=['#ffc0e9','#fbebb5','#D3FED4','#D0F0FE'];
    
    curColIndex=2;
 
    visible = true;
    selectable = true;
    removable = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    fruitCtrl = new FormControl();
    filteredFruits: Observable<any[]>;
    
    fruits: any[] = [];
    allFruits: any[] = [
                        {name:'To Do',color:'#ffc0e9'},
                        {name:'In Progress',color:'#fbebb5'},
                        {name:'Done',color:'#D3FED4'},
                        ];
    
    filterTag=this.allFruits;

                       
    @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;

    @ViewChild('formRespHTML') htmlData:ElementRef;

    
  constructor(private srv: FormService,public dialog: MatDialog,
          private router: Router,private route: ActivatedRoute) {
     
      
    
  }
  add(event: MatChipInputEvent): void {
      let input = event.input;
      let value = event.value;
      let valFound=false;
      if ((value || '').trim()) {
          let name=value.charAt(0).toLocaleUpperCase()+value.slice(1);
          value=value.toLowerCase();      
         this.allFruits.forEach(f=>{
              if(f.name.toLowerCase()===value){       
                  this.fruits.push(f);
                      valFound=true;
               }
                  });         
          if(!valFound)
          {
              this.curColIndex++;
              if(this.curColIndex==7)
                  this.curColIndex=0;
              let fe={name:name,color:this.colors[this.curColIndex]};
              this.allFruits.push(fe);
              this.fruits.push(fe);
             
       
          }
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }
      console.log('add  tags=',this.fruits.length);
      this.updateResponse();

      this.filterTags();
      this.fruitCtrl.setValue(null);
    }

    remove(value: any): void {
     
        this.fruits.forEach(entry=>{
            if(entry.name.toLowerCase() === value.name.toLowerCase())
            {
                const index = this.fruits.indexOf(entry);
                if (index >= 0) {
                    this.fruits.splice(index, 1);
                  }
            }
        });
        console.log('remove  tags=',this.fruits.length);
        
     
      
      this.filterTags();
      this.updateResponse();
        
      
    }

    selected(event: MatAutocompleteSelectedEvent): void {
     
      this.allFruits.forEach(f=>{
          if(f.name==event.option.viewValue)
             this.fruits.push(f);
      }) 
      
//      this.fruits.push(event.option.viewValue);
      
      this.fruitInput.nativeElement.value = '';
      this.fruitCtrl.setValue(null);
      
      this.filterTags();
      this.updateResponse();
      console.log('selected  tags=',this.fruits.length);
      
    }
    private filterTags(){
        this.filterTag=[];
        this.allFruits.forEach(v=>{this.filterTag.push(v)})
        this.fruits.forEach(selectedF=>{
            
                this.filterTag.forEach(f=>{
                    if(f.name==selectedF.name)
                    {
                        this.filterTag.splice(this.filterTag.indexOf(f), 1);
                    }
                })
        })
        this.currentResp.tags=[];
        this.fruits.forEach(f=>{this.currentResp.tags.push(f)});
        console.log('filter  tags=',this.fruits.length);
//        this.updateResponse();
       
    }
  updateResponse()
  {
     
     
      this.srv.updateResponse(this.currentResp.id, this.currentResp).subscribe(
              data=>{console.log(data);},
              error=>{console.log(error);}
          
         
      );
  }
  ngOnInit() {
      this.formID = this.route.snapshot.paramMap.get("id");
      
      this.srv.getResonse(this.formID).subscribe(data => {
           let result = data;
           console.log(data['First name'])
           this.responseData = result.data;
           let record=1;
           
           if(this.responseData)
               this.responseData.forEach(resp=>{
                   
                   let title='';
                   if(resp['First name'])
                       title+=resp['First name'];
                   if(resp['Last name'])
                       title+=" "+resp['Last name'];
                   if(title=='')
                       title="Submission "+record;
                   resp.title=title;
                   if(record==1)
                       this.setCurrentResponse(resp);
                   record+=1;
                  
                   });
           console.log("Form response data-->",this.responseData);
           this.dispColumns = result.columnNames;
           this.dispColumns.push("Id");
           
           this.dispColumns.forEach(val => {
               if(val!='resTime' && val!='_id' && val!='formID' && val!='IpAddress')
                   this.dispColNew.push(val);
                   
               if (val != 'null' && val!="_id" && val!="formID")
               this.colProperty.push({ name: val, dispName: val, allowDrag: true, allowHide: true });
           })
           
           this.isLoaded = true;
       })
  }
  setCurrentResponse(field)
  {
      this.currentResp=field;
      if(this.currentResp.tags)
          this.fruits=this.currentResp.tags;
      else
          this.fruits=[];
      this.filterTags();
  }
  

  rowClick(currentDiv)
  {
   
     
      var divs=document.getElementById('container').getElementsByTagName('div');  //get all divs from div called container
      let tmpTitle=currentDiv;
      currentDiv="row"+currentDiv;
      
      for(var i=0;i<divs.length; i++) 
      {
          if(divs[i].id && divs[i].id.startsWith('row')&& divs[i].id!=currentDiv){
                divs[i].className='inboxrow';
          }
          if(divs[i].id==currentDiv)
              divs[i].className='inboxrow isActive';
      
      }
      if(this.responseData)
          this.responseData.forEach(resp=>{
          if(resp.title==tmpTitle)
              this.setCurrentResponse(resp)});
      
      
      
  }
  loadChart(columnName)
  {
    this.message="changed by child";
    console.log("Got from child----->", this.message);
  }
  loadChartData (colName:string)
  {
        this.srv.getColumnChartData("test","formResponse",colName).subscribe(data=>{
        let result=data;
        let dataRetSet=result.data
        let colData:any[]=[];
        dataRetSet.forEach(val=>{
            colData.push([val['_id']+'',val['count']]);
        })
       this.chartData=colData;
      
    });
  }
  exportAsPDF()
  {
    
    
   
    let data = document.getElementById('MyDIv');
    let h=data.getBoundingClientRect().height;
    let w=data.getBoundingClientRect().width; 
//    data.style.width="540px";
    console.log("height is ",data.getBoundingClientRect().height);
    console.log("height is ",data.getBoundingClientRect().width);
    
/* 
 * you can use canvas options as below
 * 
 *    html2canvas(data,{ width: 540 }).then(canvas =
 
 * check out url https://html2canvas.hertzen.com/configuration
 * 
 */   
    html2canvas(data,{ width: 540 }).then(canvas => {
       
        
      const contentDataURL = canvas.toDataURL('image/png')
      data.style.width=w+"px";
  
      let pdf = new jspdf('p', 'pt', 'a4'); //Generates PDF in landscape mode
      // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
      
      let htmlWidth=canvas.width;
      let htmlHeight=canvas.height;
      let pageWidth = pdf.internal.pageSize.getWidth();
      let pageHeight = pdf.internal.pageSize.getHeight();
      let renderWidth=0;
      let margin=0;
      if(pageWidth<htmlWidth)
      {
              renderWidth=pageWidth-40;
              margin=20;
      }
      else if(pageWidth>=htmlWidth)
      {
          if(pageWidth-htmlWidth<40)
          {
                  renderWidth=htmlWidth-(40-(pageWidth-htmlWidth));
                  margin=20;
          }        
          else
          {
                  renderWidth=htmlWidth;
                  margin=(pageWidth-htmlWidth)/2;
          }
      }
      console.log("renderWidth",renderWidth);
      console.log("margin",margin);
      
      
      let leftMar=
      pdf.addImage(contentDataURL, 'PNG', margin,margin, renderWidth,htmlHeight);
//      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);
      pdf.save('Filename.pdf');   
    }); 
  }
 
}
