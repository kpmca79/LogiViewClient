import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ChartJSOptions } from 'app/model/ChartJSOptions';
import { DataChart } from 'app/model/DataChart';
import { FormField } from 'app/model/FormField';
import { FormService } from "app/services/form.service";
import * as Chartist from 'chartist';
import { UIChart } from 'primeng/chart';
export interface TimeData {
    _id: string,
    count: number
}
export interface columnProperty {
    name: string;
    dispName: string;
    allowDrag: boolean;
    allowHide: boolean;

}
@Component({
    selector: 'data-chart',
    templateUrl: './data-chart.component.html',
    styleUrls: ['./data-chart.component.css']


})

export class DataChartComponent implements OnInit {
    @ViewChild('chart') chart: UIChart;

    @Input() formID = "6016e71cb19f801e247af1a5";
    @Input() isEditable:boolean=true;
    @Input() title :string;
    @Input() parentQuery;
    @Input() parentQuery2;
    @Input() fillColor:string;
    @Input() pointColor:string;
    @Input() bgColor:string;
    @Input() hideXGrid:boolean;
    @Input() hideYGrid:boolean;
    @Input() showCard=true;
    @Input() pChartType;
    @Input() pWidth;
    @Input() aspectRatio;
    @Input() duration:number;
    @Input() easing;
    @Input() convertUnit;
    @Input() seriesRatio=false;
    @Input() seriesName='Response';
    
    

    bodyStyle="";
    url = "/api/response/" + this.formID + "/chartdata?"
    query = "groupBy="
    orderby = "&orderBy=resTime:1;month:1"
    frmFields: FormField[] = []
    chartType = "bar"
    isshowarea = false;
    noDataFound=false;
    isStack = false;
    noLabelTypes = ["pie", 'doughnut', 'polarArea', 'radar']
    showLegendTypes = ["pie", 'doughnut', 'polarArea', 'line']
    types = [{ val: "bar", disp: "Bar" }, { val: "horizontalBar", disp: "Horizontal" }, { val: "line", disp: "Line" }, { val: "pie", disp: "Pie" }, { val: "doughnut", disp: "Doughnut" }, { val: "polarArea", disp: "PolarArea" }, { val: "radar", disp: "Radar" }];
    data = {

        labels: [],
        datasets: [
            {
                label: 'Form Views',
                backgroundColor: ["#FFCE56"],
                data: [],
                borderColor: '#565656'

            }

        ]
    }
    fg = false;
    dataChartOption: DataChart = new DataChart();
    dataChartValues: any = { labels: [], series: [], fill: 'end' };
    chartDivID = "11"
    arrFields;
    islegend = false;

    chartGrp = "Last name"
    chartGrp2;
    chartJsOps: ChartJSOptions = new ChartJSOptions();
    tmpCharJsOps = this.chartJsOps;
    
    responsiveOptions: any[] = [
        ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
                labelInterpolationFnc: function (value) {
                    return value[0];
                }
            }
        }]
    ];
    tmpfillColor: any;
    constructor(private frmSrv: FormService, private dtPipe: DatePipe,private _sanitizer: DomSanitizer) { }
    async changeChart() {
      await   this.generateChart();
    }
    async ngOnInit() {
        if(this.pChartType)
            this.tmpCharJsOps.type=this.pChartType;
        if(this.aspectRatio)
            this.tmpCharJsOps.aspectRatio=this.aspectRatio;
        this.tmpfillColor=this.fillColor;
       //https://www.chartjs.org/docs/latest/configuration/animations.html for animations
        if(this.duration)    
            this.tmpCharJsOps.animation.duration=this.duration;
        if(this.easing)    
            this.tmpCharJsOps.animation.easing=this.easing;
        let data = await this.frmSrv.getFormFields(this.formID);
        this.frmFields = data.data;
        this.arrFields = [];
        this.frmFields.forEach(f => { this.arrFields.push({ val: f.title, id: f.id }) })
        await this.generateChart();
    }
    changeFill() {
        this.tmpCharJsOps.data.datasets.forEach(va => { va.fill = this.isshowarea });
        if (this.chart)
            this.chart.reinit();
    }
    showLegend() {

        this.tmpCharJsOps.legend.display = this.islegend;
        if (this.chart)
            this.chart.reinit();
    }
    stack() {
        if(this.tmpCharJsOps.scales)
        {
            this.tmpCharJsOps.scales.yAxes[0].stacked = this.isStack;
            this.tmpCharJsOps.scales.xAxes[0].stacked = this.isStack;
            if (this.chart)
                this.chart.reinit();
        }
    }
    ngAfterViewInit(){
        
    }
    checkLegend() {
        if (this.showLegendTypes.includes(this.tmpCharJsOps.type))
            return true;
        if (this.chartGrp2)
            return true;
        else return false;
    }
    async generateChart() {

        let query2 = '';
        if (this.parentQuery)
            query2 =  this.parentQuery;
        else if (this.chartGrp2)
            query2 = this.query + this.chartGrp + ";" + this.chartGrp2;
        else
            query2 = this.query + this.chartGrp;

        console.log("query2-------->", query2);
        if(this.parentQuery && this.parentQuery.includes('orderBy'))
            this.orderby='';
        let result = await this.frmSrv.getChartData(this.formID,query2 + this.orderby);
        console.log("result-------->", result);
        if (result) {

            if (this.chartGrp2) {
                //prepare data 
                let arrGrp1Labels = [];
                let arrGrp2Labels = [];
                let grp1Indx = 0;
                result.data.forEach(val => {
                    let grp1label = val[this.chartGrp];
                    if (!arrGrp1Labels.includes(grp1label))
                        arrGrp1Labels.push(grp1label);
                });
                result.data.forEach(val => {

                    let grp2label = val[this.chartGrp2];
                    let grp1label = val[this.chartGrp];
                    let ind = -1;
                    let i = 0;
                    arrGrp2Labels.forEach(v1 => {
                        if (v1.label == grp2label) {
                            ind = i;

                        }
                        i++;
                    });

                    if (ind == -1) {
                        let color = this.getRandomColor();
                        let clrarr = [];
                        if (this.noLabelTypes.includes(this.chartJsOps.type) || this.chartJsOps.type == "bar" || this.chartJsOps.type == "horizontalBar" || this.chartJsOps.type == "polarArea")
                            arrGrp1Labels.forEach(g1 => clrarr.push(color))
                        else
                            clrarr.push(color);

                        let objs = { label: grp2label, data: [], backgroundColor: clrarr, fill: this.isshowarea, borderColor: clrarr }
                        let dataArr = [];

                        for (let i = 0; i < arrGrp1Labels.length; i++) dataArr.push(0);
                        objs.data = dataArr;

                        arrGrp2Labels.push(objs);
                    }
                    let indOfLabel = arrGrp1Labels.indexOf(grp1label);
                    let indOfsublabel = 0;
                    arrGrp2Labels.forEach(sub => {
                        if (sub.label == grp2label) {
                            sub.data[indOfLabel] = val['total'];
                        }
                        indOfsublabel = indOfsublabel + 1;
                    })

                });

                if (this.noLabelTypes.includes(this.chartJsOps.type))
                    this.tmpCharJsOps.scales = null;
                else
                    this.tmpCharJsOps = this.chartJsOps;

                this.tmpCharJsOps.data.labels = this.formatDate(arrGrp1Labels);
                this.tmpCharJsOps.data.datasets = arrGrp2Labels;
                if(this.tmpCharJsOps.data.labels.length==0)
                    this.noDataFound=true;
            }
            else {
                if (this.noLabelTypes.includes(this.chartJsOps.type))
                    this.tmpCharJsOps.scales = null;
                else
                    this.tmpCharJsOps = this.chartJsOps;
                this.tmpCharJsOps.data.labels = this.formatDate(result.data.label);
                
                if(this.tmpCharJsOps.data.labels.length==0)
                    this.noDataFound=true;

                let clrarr = [];
                let color = this.getRandomColor();
                this.tmpfillColor=this.fillColor;
                if (this.noLabelTypes.includes(this.chartJsOps.type) || this.chartJsOps.type == "bar" || this.chartJsOps.type == "horizontalBar" || this.chartJsOps.type == "polarArea")
                    result.data.label.forEach((g1,ind) => {if(ind==0 && this.tmpfillColor)clrarr.push(this.tmpfillColor); else clrarr.push(this.getRandomColor());});
                else
                    clrarr.push(color);
                if(this.fillColor)
                   { 
                       this.tmpCharJsOps.elements.point.backgroundColor=this.fillColor;    
                       this.tmpCharJsOps.elements.point.borderColor=this.fillColor;    
                       
                   }
                if(this.pointColor)
                   { 
                        this.tmpCharJsOps.elements.point.backgroundColor=this.pointColor;    
                        this.tmpCharJsOps.elements.point.borderColor=this.pointColor;    
                        this.tmpCharJsOps.data.borderColor=[this.pointColor];
                   }
                let borderColor=clrarr;
                let objs;
                if(this.pointColor)
                    objs = { label: this.seriesName, data: result.data.series, backgroundColor: clrarr, fill: this.isshowarea, borderColor: this.pointColor }
                else
                    objs = { label: this.seriesName, data: result.data.series, backgroundColor: clrarr, fill: this.isshowarea, borderColor: clrarr }
                
                this.tmpCharJsOps.data.datasets = [objs];
                if(this.convertUnit)
                    this.processConvertUnit();  
                if(this.parentQuery2 && this.seriesRatio)
                    this.processRatio();     
                this.fg = true;
                let arrcolor: string[] = [];

            }
            this.setOptions();
            
            if (this.chart && !this.seriesRatio)
                this.chart.reinit();
           
           
        }

    }
    async processRatio() {
        if(this.parentQuery2 && this.seriesRatio)
        {
            let result2 = await this.frmSrv.getChartData(this.formID,this.parentQuery2 + this.orderby);
            let label2:string[]=[];
            let series2:[]=[];
            let series=this.tmpCharJsOps.data.datasets[0].data;
            let label= this.tmpCharJsOps.data.labels;
            
            if(result2.data.label)
            {
              label2=this.formatDate(result2.data.label);
              series2=result2.data.series;
              label.forEach((title,index)=>{
                let newper="0";
                let curVal=series[index];
                let ind=label2.indexOf(title);
                if(ind>-1)
                  newper=((series2[ind]/curVal)*100).toFixed(0);
                 series[index]=newper;
               });
               this.tmpCharJsOps.data.datasets[0].data=series;
               if(this.chart)
                this.chart.reinit();
               
            }
            

        }
    }
    processConvertUnit() {
        if(this.convertUnit.startsWith('/'))
        {
            let divisionNum=Number.parseInt(this.convertUnit.replace("/",""))
            let series=this.tmpCharJsOps.data.datasets[0].data
            series.forEach((val,index)=>{
                
                let numVal=(Number.parseInt(val)/divisionNum).toFixed(0);
                series[index]=numVal;
                
            })
        }
    }
    reDraw(query){
       
       this.tmpfillColor=this.fillColor;
       this.parentQuery=query;
       this.noDataFound=false;
       this.ngOnInit();
    }
    reInitChart(){
        if(this.chart)
            this.chart.reinit();
    }
    setOptions(){
        if(this.fillColor)
            this.tmpCharJsOps.data.datasets.forEach(va => { va.fill = true; });
        if(this.hideXGrid && this.tmpCharJsOps.scales)    
            this.tmpCharJsOps.scales.xAxes[0].gridLines.color="rgba(255, 125, 125, 0)";
        if(this.hideYGrid && this.tmpCharJsOps.scales)    
            this.tmpCharJsOps.scales.yAxes[0].gridLines.color="rgba(255, 125, 125, 0)";
        if(this.bgColor)    
              this.tmpCharJsOps.backgroundColor=this.bgColor;    
        if(this.tmpCharJsOps.backgroundColor)                  
            this.bodyStyle="background:"+this.tmpCharJsOps.backgroundColor;        
        if(this.pWidth)                  
            this.bodyStyle=this.bodyStyle+";width:"+this.pWidth;            
        if(this.title){
            this.tmpCharJsOps.title.display=true;
            this.tmpCharJsOps.title.text=this.title;
        }
        if(this.pChartType)
            this.tmpCharJsOps.type=this.pChartType;
            
    

    }

    sanitizeHTML( style: string ): SafeStyle {
        return this._sanitizer.bypassSecurityTrustStyle( style );
    }
    getRandomColor() {
        

        if(this.tmpfillColor)
        {
            if(this.noLabelTypes.includes(this.pChartType))
            {
                if(this.tmpfillColor.startsWith("rgba") || this.tmpfillColor.startsWith("rgb"))
                {
                    let inc=10;
                    let tmpcl=this.tmpfillColor;
                    tmpcl=tmpcl.replace("rgba","").replace("rgb","").replace("(","").replace(")","");
                    let clrs=tmpcl.split(",");
                    let r=Number.parseInt(clrs[0]);
                    let g=Number.parseInt(clrs[1]);
                    let b=Number.parseInt(clrs[2]);
                    let a="1";
                    if(clrs.length==4)
                     a=clrs[3];
                    r=r+inc; g=g+inc; b=b+inc;
                    if(r>255)r=255;if(g>255)g=255;if(b>255)b=255;
                    this.tmpfillColor="rgba("+r+","+g+","+b+","+a+")";
                    
                    
                }
            }
            return this.tmpfillColor;
        }  
        var color = Math.floor(0x1000000 * Math.random()).toString(16);
        return '#' + ('000000' + color).slice(-6);

    }
    formatDate(labels): any {
        if (labels)
            labels.forEach((v: string, index) => {
                if (v && v.length > 10 && v.charAt(4) == '-' && v.charAt(7) == '-')
                    labels[index] = this.dtPipe.transform(v, 'dd-MMM-yy');


            })
        return labels;
    }
}

