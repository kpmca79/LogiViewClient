import { Injectable, QueryList, ElementRef } from '@angular/core';
import * as Highcharts from 'highcharts';
import highcharts3D from 'highcharts/highcharts-3d.src';
highcharts3D(Highcharts);

@Injectable( {
    providedIn: 'root'
} )
export class HighchartsService {

    constructor() { }
    createChart( chartDivs:QueryList<ElementRef>,  charts: any[] ) {
       chartDivs.forEach((el,index)=>{
           
           console.log("YYYYYYYYYYYYYOOOOOOOOOOOOOO ",el);
           console.log("YYYYYYYYYYYYYOOOOOOOOOOOOOO Index=",index);
           
                Highcharts.chart( el.nativeElement, charts[index+1] );   
       });
        
    }
    getChartOptionObj(
        title: string,
        type: string,
        xData: string[],
        xtitle: string,
        ytitle: string,
        yMin: number,
        stack: string,
        series: any,
        is3D: boolean,
        depth:number,
       slop:number
        
    ): any {
        let opt: any;
        opt = {
            chart: {
                type: type,
                options3d: {
                    enabled: is3D,
                    alpha: slop
                  }
                
            },
            title: {
                text: title
            },
            xAxis: {
                categories: xData,
                title: xtitle
            },
            yAxis: {
                min: yMin,
                title: {
                    text: ytitle
                }
            },
           
            plotOptions:{},
            series: series
        };
        
       
        
        if(type=="pie")
        {
            opt.plotOptions.pie= {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
                
            }
            if(is3D)
            {    opt.plotOptions.pie.innerSize=100;
                opt.plotOptions.pie.depth=45;
            }
            opt.tooltip= { pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'}
            opt=this.changeSereirseData(opt);
            
        }
        console.log("CCCCCCC PIE ",opt);
        return opt;

    }
    changeSereirseData(opt): any
    {
        let data:string[];
            data=opt.xAxis.categories;
        let newdata:any[]=[];
        let seriesData:any[]=opt.series[0].data;  
        data.forEach((name,index)=>{
            newdata.push({
                            "name":name,
                            "y":seriesData[index]
                            });
            
        }); 
      
        opt.series[0].data=newdata;
        return opt;
    }
}
