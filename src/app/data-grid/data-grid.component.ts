import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkDragStart, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { GoogleChart } from '../model/GoogleChart';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Output } from "@angular/core";
import { EventEmitter, ElementRef, QueryList, ViewChildren } from "@angular/core";
import { DatePipe } from '@angular/common';
import { HighchartsService } from '../services/highcharts.service'
import { Chart } from '../model/Chart'
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";



export interface columnProperty {
    name: string;
    dispName: string;
    allowDrag: boolean;
    allowHide: boolean;

}
@Component({
        selector: 'data-grid',
    templateUrl: './data-grid.component.html',
    styleUrls: ['./data-grid.component.css'],
    providers: [ NgbCarouselConfig ]
    
})

export class DataGridComponent implements OnInit {

    //VARIABLE DECLARATION

    @Input('Data') data: any[];
    @Input('columnProperties') columnProperties: any[];
    @Input('pageSize') pageSize: number = 10;
    @Input('requireSelection') reqSelection: boolean = false;
    @Input('chartData') chartdata;
    @Input('hideColumn') hidencols: string[]=['']
    @Output()
    loadChartData: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
    @ViewChild(MatSort,{static:true}) sort: MatSort;
    @ViewChildren('chartDivs') chartDivs: QueryList<ElementRef>;
    
//    @ViewChild('testcharts',{static:true}) public chartEl: ElementRef;

    chart:any; 
    charts: any[] = [];
    allowDrag: boolean = false;
    displayedColumns: string[] = [];
    pageSizeOption: number[] = [this.pageSize];
    dataColumns: string[] = [];
    dataSource: MatTableDataSource<any>;
    selection = new SelectionModel<any>(true, []);
    previousIndex: number;
    panelOpenState = false;
    // images = [1].map(() => '/assets/Lighthouse.jpg');
    //  https://images.pexels.com/photos/952670/pexels-photo-952670.jpeg?cs=srgb&dl=background-black-colors-952670.jpg&fm=jpg
    images =[10].map(()=>'/assets/img/red3.png') ;
    chartAvail: boolean = false;
    message:String="";
   

    //END VARIABLE DECLARATION

    constructor(private config: NgbCarouselConfig, private dateP:DatePipe, 
            private highcharts:HighchartsService,  private sanitizer: DomSanitizer) {
        config.interval = 1000;
        config.wrap = true;
        config.keyboard = false;
        config.pauseOnHover = true;
        config.showNavigationIndicators = true;
        config.showNavigationArrows = true;
    }

    ngOnInit() {
  
       this.charts.push(null);
        this.pageSizeOption = [this.pageSize];
        
        console.log("!!!!! " + JSON.stringify(this.data));
        this.data
        
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.setDisplayColumns();
        let chartOptions=this.highcharts.getChartOptionObj("Fruit chart", "column", 
                ["apple","banana","orange"], "Fruits", "Fruits consumed", null, null, 
                [{name:"Fruits",data: [5, 3, 4]}],true,45,10);
//        let chartOptions={
//                            chart:{
//                                    type:'pie'
//                            },
//                            title:{
//                                text:"fruit chart"
//                            },
//                            xAxis: {
//                                categories:["apple","banana","orange"],
//                                title:"Different fruits"
//                                },
//                            yAxis: {
//                                min: 0,
//                                title: {
//                                  text: 'Total fruit consumption'
//                                }
//                              },
//                              series: [{
//                                 
//                                  data: [5, 3, 4]
//                                }]
//        };
                            
        
        console.log("============================================ ",chartOptions);
        
//        this.highcharts.createChart(this.chartEl.nativeElement, chartOptions);
        //   this.generateChart('firstname');

    }
     loadData()
    {
    //      this.loadChartData.emit("This is called from datagrid");
    }
//    addChart(colName) {
//
//        let gChart: GoogleChart = {
//            title: "Chart analysis of " + colName.toUpperCase(),
//            columnNames: [colName, 'Count'],
//            options: {
//                is3D: true,
//                //                        pieSliceText: 'value-and-percentage',
//                pieSliceText: 'percentage',
//                animation: { "startup": true },
//                legend: { position: "right" },
//                allowHtml: true,
//                colors:['#591F1E','#772A28','#B33E3C','#B97F7E','#F7AAA8','#FAD4D3'] 
//                //['#b67676','#b44747','#db1414','#690707','#360101']
//
//            },
//            type: "PieChart",
//            data: this.chartdata,
//            width: 700,
//            height: 320
//        }
//
//
//        this.charts.push(gChart);
//        console.log(this.charts);
//        this.chartAvail = true;
//        this.panelOpenState = true;
//    }
      addChart(colName,type) {

          console.log("@@@@@@@@@@@@@@@@@@ ",type)
          let chartOptions=this.highcharts.getChartOptionObj(colName+"chart", type, 
                  this.getXData(this.chartdata), colName, "Count of "+colName, null, null, 
                  [{name:colName,data: this.getYData(this.chartdata)}],true,45,10);
         console.log("CharData--->",this.chartdata); 
         this.charts.push(chartOptions);
         console.log(this.charts);
         this.chartAvail = true;
         this.panelOpenState = true;
         this.ngAfterViewInit();
//         if(this.chartDivs)
//             this.highcharts.createChart(this.chartDivs, this.charts);
//         else
//             console.log("chartdivs not found");
        
     }
      ngAfterViewInit() {
          
          if(this.chartDivs) 
              this.highcharts.createChart(this.chartDivs, this.charts);
          else
              console.log("chartdivs not found");
       }
    public getXData(chartdataTmp): any[]
    {
            let category:any[]=[];
            chartdataTmp.forEach((data)=>{
                category.push(data[0]);
            });
            return category;
    }
    public getYData(chartdataTmp): any[]
{
        let category:any[]=[];
        chartdataTmp.forEach((data)=>{
            category.push(data[1]);
        });
        return category;
}
    async generateChart(colName: string,chartType) {
        console.log("Inside generatechart type is ",chartType)
        let a = this.loadChartData.emit(colName);
        let itrNo = 1;
        while (!this.chartdata || this.chartdata.length == 0) {
            await this.delay(10);
            itrNo = itrNo + 1;
            if (itrNo > 500)
                break;
        }
        if (this.chartdata)
            this.addChart(colName,chartType);
        console.log("calling parent method")
        console.log("calling parent method got success", this.chartdata)
        this.chartdata = null;
    }
          
    async generatePieChart(colName: string) {
        this.generateChart(colName,"pie");
    }
    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    createChart(colData) {
        console.log(colData)

        //      this.chart.removeSeries(0);
        //      this.chart.addSeries(colData, true, true);
        this.chartAvail = true;
    }
    generateUniqueArray(result, p: string): any[] {
        let groupData: any[] = [];

        result.forEach(val => {
            if (val[p] !== null)
                if (groupData.indexOf(val[p]) == -1)
                    groupData.push(val[p]);


        });
        return groupData;

    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: any): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
    }
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }



    dragStarted(event: CdkDragStart, index: number) {
        this.previousIndex = index;
    }

    dropListDropped(event: CdkDropList, index: number) {
        if (this.columnProperties[index].allowDrag) {
            if (event) {
                console.log("prev index: ", this.previousIndex);
                console.log("drop index: ", index);
                let temp = this.columnProperties[index];
                this.columnProperties[index] = this.columnProperties[this.previousIndex];
                this.columnProperties[this.previousIndex] = temp;
                //           moveItemInArray(this.columnProperties, this.previousIndex, index);
                this.setDisplayColumns();
                console.log("dispcol: ", this.displayedColumns);

            }
        }
    }
    sanitizeHTML(style:string): SafeStyle {
        return this.sanitizer.bypassSecurityTrustHtml(style);
    }
    setDisplayColumns() {
        this.displayedColumns = [];
        if (this.reqSelection)
            this.displayedColumns.push('select');


        this.columnProperties.forEach(val => {
            this.displayedColumns.push(val.name);

            this.dataColumns.push(val.name);
        })
        this.hidencols.forEach((val) => {
            this.displayedColumns = this.displayedColumns.filter(item => item !== val);
        })
        console.log(this.displayedColumns);
    }
    capi(parm:any): any
    {
        if(typeof parm ==="string" )
        {
            if(parm.includes("GMT"))
            {
          
                var datepartall=parm.split(" ");
                var dmypart=datepartall[0].split("-");
                var day=dmypart[0];
                var mon=dmypart[1];
                var year=dmypart[2];
                var time=datepartall[1];
                var validDate=mon+"-"+day+"-"+year+" "+time
                let   date =  new  Date(validDate);
                return this.dateP.transform(date, 'dd/MM/yy hh:mm');  
            }
      }
        return parm;
    }

}

