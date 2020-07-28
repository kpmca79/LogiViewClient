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
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


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
    dispColumns: [] = [];
    message = "this is from parent"
    chartData: any[] = []; 
    hidencols: string[] = ['resp_country','resp_state','resp_city','latitude','longitude','IpAddress','resTime'];
    @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
    frm: Form;
    currentResp;
    dispColNew:string[]=[];
    
    
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = false;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    fruitCtrl = new FormControl();
    filteredFruits: Observable<string[]>;
    fruits: string[] = ['Lemon'];
    allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
    @ViewChild('fruitInput',{static: true}) fruitInput: ElementRef;
    
  constructor(private srv: FormService,public dialog: MatDialog,
          private router: Router,private route: ActivatedRoute) {
      
          this.filteredFruits = this.fruitCtrl.valueChanges.pipe(startWith(null),
              map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }
  
  add(event: MatChipInputEvent): void {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.fruits.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.fruitCtrl.setValue(null);
    }

    remove(fruit: string): void {
      const index = this.fruits.indexOf(fruit);

      if (index >= 0) {
        this.fruits.splice(index, 1);
      }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
      this.fruits.push(event.option.viewValue);
      this.fruitInput.nativeElement.value = '';
      this.fruitCtrl.setValue(null);
    }

    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();

      return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
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
                       this.currentResp=resp;
                   record+=1;
                   
                   });
           console.log("Form response data-->",this.responseData);
           this.dispColumns = result.columnNames;
           
           this.dispColumns.forEach(val => {
               if(val!='resTime' && val!='_id' && val!='formID' && val!='IpAddress')
                   this.dispColNew.push(val);
                   
               if (val != 'null' && val!="_id" && val!="formID")
               this.colProperty.push({ name: val, dispName: val, allowDrag: true, allowHide: true });
           })

           this.isLoaded = true;
       })
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
          this.responseData.forEach(resp=>{if(resp.title==tmpTitle)this.currentResp=resp;});
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
 
}
