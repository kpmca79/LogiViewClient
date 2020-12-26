import { Component, OnInit, ViewChild } from '@angular/core';
import { FormService } from "../../services/form.service";
import { Form } from "../../model/Form";
import { MatPaginator } from '@angular/material/paginator';
import { Router, ActivatedRoute } from "@angular/router";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { CommentNode } from 'app/comment-tree/comment-tree.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-form-inbox',
  templateUrl: './form-inbox.component.html',
  styleUrls: ['./form-inbox.component.css'],

})
export class FormInboxComponent implements OnInit {

  formID: String;
  isLoaded: boolean = false;
  title = 'mattab';
  responseData: any[];
  limit = 10;
  skip = 0;
  leftNavOpen: boolean = true;
  charts
  
  rows = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  dispColumns: any[] = [];
  message = "this is from parent"
  chartData: any[] = [];
  queryColumns=['_id'];
  hidencols: string[] = ['id','title','_id','formID','tags','comments','resp_country', 'resp_state', 'resp_city', 'latitude', 'longitude', 'IpAddress', 'resTime'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  comments: Array<CommentNode> = [];
  scrollconfig = {
    suppressScrollX: true
  };
  throttle = 10;
  scrollDistance = 1;
  scrollUpDistance = 2;
  scrollCheck = false;

  frm: Form;
  currentResp;
  dispColNew: string[] = [];
  searchform = "";
  postBody = null;
  inboxPage = 0;



  colors: string[] = ['#ffc0e9', '#fbebb5', '#D3FED4', '#D0F0FE', '#EDE2FE', '#FEE2D5', '#C2F5E9'];
  //    colors:string[]=['#ffc0e9','#fbebb5','#D3FED4','#D0F0FE'];

  curColIndex = 2;
  totalRecords = 0;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<any[]>;

  fruits: any[] = [];
  allFruits: any[] = [
    { name: 'To Do', color: '#ffc0e9' },
    { name: 'In Progress', color: '#fbebb5' },
    { name: 'Done', color: '#D3FED4' },
  ];

  filterTag = this.allFruits;


  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('formRespHTML') htmlData: ElementRef;

  
  constructor(private srv: FormService, public dialog: MatDialog,private router: Router, private route: ActivatedRoute) {
  }
  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;
    let valFound = false;
    if ((value || '').trim()) {
      let name = value.charAt(0).toLocaleUpperCase() + value.slice(1);
      value = value.toLowerCase();
      this.allFruits.forEach(f => {
        if (f.name.toLowerCase() === value) {
          this.fruits.push(f);
          valFound = true;
        }
      });
      if (!valFound) {
        this.curColIndex++;
        if (this.curColIndex == 7)
          this.curColIndex = 0;
        let fe = { name: name, color: this.colors[this.curColIndex] };
        this.allFruits.push(fe);
        this.fruits.push(fe);


      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.updateResponse();
    this.filterTags();
    this.fruitCtrl.setValue(null);
  }

  remove(value: any): void {

    this.fruits.forEach(entry => {
      if (entry.name.toLowerCase() === value.name.toLowerCase()) {
        const index = this.fruits.indexOf(entry);
        if (index >= 0) {
          this.fruits.splice(index, 1);
        }
      }
    });
    this.filterTags();
    this.updateResponse();

  }

  selected(event: MatAutocompleteSelectedEvent): void {

    this.allFruits.forEach(f => {
      if (f.name == event.option.viewValue)
        this.fruits.push(f);
    })
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
    this.filterTags();
    this.updateResponse();
    console.log('selected  tags=', this.fruits.length);

  }
  private filterTags() {
    this.filterTag = [];
    this.allFruits.forEach(v => { this.filterTag.push(v) })
    this.fruits.forEach(selectedF => {

      this.filterTag.forEach(f => {
        if (f.name == selectedF.name) {
          this.filterTag.splice(this.filterTag.indexOf(f), 1);
        }
      })
    })
    this.currentResp.tags = [];
    this.fruits.forEach(f => { this.currentResp.tags.push(f) });
    
    //        this.updateResponse();

  }
  updateResponse() {
    this.srv.updateResponse(this.currentResp.id, this.currentResp).subscribe(
      data => { console.log(data); },
      error => { console.log(error); }
    );
  }
  async onScrollDown() {
    this.inboxPage = this.inboxPage + 1;
    this.skip = this.inboxPage * this.limit;
    if (this.skip >= this.totalRecords)
      return;
    if (this.searchform && this.searchform.trim() != '')
      this.postBody = { skip: this.skip, limit: this.limit, searchString: this.searchform, searchColumns: this.queryColumns };
    else
      this.postBody = { skip: this.skip, limit: this.limit };
    this.scrollCheck = true;
    const a = await this.loadInboxData('scroll');
    console.log("End Page scrolled event total records=", this.responseData.length);

  }
  async searchData(ent) {
    this.skip = 0;
    this.inboxPage = 0;
    document.getElementById('inbox-rows').remove;
    this.postBody = { skip: this.skip, limit: this.limit, searchString: this.searchform, searchColumns: this.queryColumns};
    const a = await this.loadInboxData('search');
 }
 loadInboxData(mode: string): Promise<any> {
    let selectedResp=null;
    if(mode=='scroll')
      selectedResp=this.currentResp;
    if (!this.postBody)
      this.postBody = { skip: this.skip, limit: this.limit };
    let promise = new Promise((resolve) => {
      this.srv.getResonseWithFilter(this.formID, this.postBody).subscribe(data => {
        let result = data;
        if (this.responseData && mode == 'scroll')
          this.responseData = this.responseData.concat(result.data);  
        else
          this.responseData = result.data;
        let record = 1;
        if (result && result.totalCount)
          this.totalRecords = result.totalCount
        if (!this.responseData || this.responseData.length == 0)
          this.currentResp = null;
        if (this.responseData)
          this.responseData.forEach(resp => {
            let title = '';
            if (resp['Order Summary']) {
              title = "Order: " + resp['Order Summary'].orderid.toUpperCase();
            }
            if (resp['First name'])
              title += resp['First name'];
            if (resp['Last name'])
              title += " " + resp['Last name'];
            if (title == '')
              title = "Submission " + record;
            resp.title = title;
            if (record == 1 && mode != "scroll")
              selectedResp=resp;
            record += 1;

          });

        //console.log("Form response data-->",this.responseData);
        this.dispColumns = result.columnNames;
        if (!this.dispColNew || this.dispColNew.length == 0) {
          this.dispColumns.forEach(val => {
            if (this.hidencols.indexOf(val.name)==-1)
              this.dispColNew.push(val);
              this.queryColumns.push(val.id);
          });
        }
        this.isLoaded = true;
        this.scrollCheck = false;
        if(mode!="scroll")
          this.setCurrentResponse(selectedResp);
        resolve('');
      });
    })
    return promise;
  }
  async ngOnInit() {
    this.formID = this.route.snapshot.paramMap.get("id");
    const obj = await this.loadInboxData('init');

  }
  setCurrentResponse(selectedResponse) {
    if(!selectedResponse){
      this.comments=[];
      this.fruits=[];
      return;
    }
    this.currentResp = selectedResponse;
    if (this.currentResp.comments)
      this.comments = this.currentResp.comments;
    else
      this.comments = [];
    if (this.currentResp.tags)
      this.fruits = this.currentResp.tags;
    else
      this.fruits = [];
    this.filterTags();

  }
 
  loadChart(columnName) {
    this.message = "changed by child";
    console.log("Got from child----->", this.message);
  }
  loadChartData(colName: string) {
    this.srv.getColumnChartData("test", "formResponse", colName).subscribe(data => {
      let result = data;
      let dataRetSet = result.data
      let colData: any[] = [];
      dataRetSet.forEach(val => {
        colData.push([val['_id'] + '', val['count']]);
      })
      this.chartData = colData;

    });
  }
  exportAsPDF() {



    let data = document.getElementById('MyDIv');
    let h = data.getBoundingClientRect().height;
    let w = data.getBoundingClientRect().width;
    //    data.style.width="540px";
    console.log("height is ", data.getBoundingClientRect().height);
    console.log("height is ", data.getBoundingClientRect().width);

    /* 
     * you can use canvas options as below
     * 
     *    html2canvas(data,{ width: 540 }).then(canvas =
     
     * check out url https://html2canvas.hertzen.com/configuration
     * 
     */
    html2canvas(data, { width: 540 }).then(canvas => {


      const contentDataURL = canvas.toDataURL('image/png')
      data.style.width = w + "px";

      let pdf = new jspdf('p', 'pt', 'a4'); //Generates PDF in landscape mode
      // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode

      let htmlWidth = canvas.width;
      let htmlHeight = canvas.height;
      let pageWidth = pdf.internal.pageSize.getWidth();
      let pageHeight = pdf.internal.pageSize.getHeight();
      let renderWidth = 0;
      let margin = 0;
      if (pageWidth < htmlWidth) {
        renderWidth = pageWidth - 40;
        margin = 20;
      }
      else if (pageWidth >= htmlWidth) {
        if (pageWidth - htmlWidth < 40) {
          renderWidth = htmlWidth - (40 - (pageWidth - htmlWidth));
          margin = 20;
        }
        else {
          renderWidth = htmlWidth;
          margin = (pageWidth - htmlWidth) / 2;
        }
      }
      console.log("renderWidth", renderWidth);
      console.log("margin", margin);


      let leftMar =
        pdf.addImage(contentDataURL, 'PNG', margin, margin, renderWidth, htmlHeight);
      //      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);
      pdf.save('Filename.pdf');
    });
  }

}
