import { DatePipe } from '@angular/common';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataChartComponent } from 'app/data-chart/data-chart.component';
import { FormService } from "app/services/form.service";
import * as Chartist from 'chartist';
import * as moment from 'moment';

import {CalendarModule} from 'primeng/calendar';

/*import Highcharts from "highcharts/highmaps";
import worldMap from "@highcharts/map-collection/custom/world.geo.json";*/

export interface TimeData{
    _id: string,
    count: number
}


@Component({
  selector: 'app-formdashboard',
  templateUrl: './formdashboard.component.html',
  styleUrls: ['./formdashboard.component.scss']
})
export class FormdashboardComponent implements OnInit {
    @ViewChild('customChart') customChart:DataChartComponent;
    
    /*Highcharts: typeof Highcharts = Highcharts;*/
    chartConstructor = "mapChart";
    chartData = [{ code3: "ABW", z: 105 }, { code3: "AFG", z: 35530 }];
    
  
    /*chartOptions: Highcharts.Options = {
      chart: {
        map: worldMap
      },
      title: {
        text: "Highmaps basic demo"
      },
      subtitle: {
        text:
          'Source map: <a href="http://code.highcharts.com/mapdata/custom/world.js">World, Miller projection, medium resolution</a>'
      },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          alignTo: "spacingBox"
        }
      },
      legend: {
        enabled: true
      },
      colorAxis: {
        min: 0
      },
      series: [
        {
          type: "map",
          name: "Random data",
          states: {
            hover: {
              color: "#BADA55"
            }
          },
          dataLabels: {
            enabled: true,
            format: "{point.name}"
          },
          allAreas: false,
          data: []
        }]};
    */


    max=-1;
    goodDay='Sunday';
    maxhrCount=-1;
    maxHr='';
    showHourChart=false;
    showMonthChart=false;
    showDayChart=false;
    weekFirstDay;
    weekLastDay;
    fromDate;
    toDate;
    allTimeQuery="groupBy=resTime:date"
    currentWeekQuery="groupBy=resTime:date"
    currentMonthQuery;
    customQuery
    fillColor="rgba(239,189,80,0.2)";
    pointColor="rgba(239,189,80,0.7)";

    tmpFromDate=new Date();
    tmpToDate=new Date();

    googleMapAPIKey="AIzaSyDSAywz0ynKkTjasyvpMl_NmQ3vjTV7YPQ";


    optionsDailyResponse: any = {
            lineSmooth: Chartist.Interpolation.cardinal({tension: 0}),
            // low: 0, high: 50, 
            chartPadding: { top: 20, right: 0, bottom: 0, left: 0},
        }
  optionsMonthlyResponse = {
            axisX: {
                showGrid: false
            },
            low: 0,
            high: 20,
            chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
        };
    optionsHourlyResponse = {
            axisX: {
                showGrid: false
            },
            low: 0,
            high: 20,
            chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
        };
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
  constructor(private frmSrv: FormService,private route: ActivatedRoute,private datePipe: DatePipe) { }
  formID;
  timeDailyData:TimeData[];
  dailyCount=[0,0,0,0,0,0,0];
  monthlyCount=[0,0,0,0,0,0,0,0,0,0,0,0];
  
  dataDailyResponse: any = {
          labels: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
          series: [
              [0,0,0,0,0,0,0]
          ]
      };
   dataMonthlyResponse = {
          labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
          series: [
            [1012,3221,3245,7865,2345,4534,7453,5436,3564,3464,3421,3464]

          ]
        };
   dataHourlyResponse = {
           labels: [],
           series: [[]]
         };
  dataRead=false;
  weekDaysChartDiv;
  montlyChartDiv;
  hourlyChartDiv;
  
  ngOnInit() {
      

          this.formID = this.route.snapshot.paramMap.get( "id" );

          var currentDate = moment();
          let weekStart = currentDate.clone().startOf('week').format("DD-MM-YYYY");
          let weekEnd = currentDate.clone().endOf('week').format("DD-MM-YYYY");
          console.log("weekStart=",weekStart);
          console.log("weekend=",weekEnd);
          this.currentWeekQuery=this.allTimeQuery+"&"+"where=resTime:$gte:"+weekStart
          console.log(this.currentWeekQuery);
          let monthStart = currentDate.clone().startOf('month').format("DD-MM-YYYY");
          this.currentMonthQuery=this.allTimeQuery+"&"+"where=resTime:$gte:"+monthStart
          this.show();
         // this.getDailyResp();
          for(let i=0;i<24;i++)
          {    this.dataHourlyResponse.labels.push(""+i+"");
               this.dataHourlyResponse.series[0].push(0);
          }
          

          
  }
  
  show() {
    var currentDate = moment();

    console.log("-------->dates------>",this.tmpFromDate," and ",this.tmpToDate);
    
    
    if(!this.fromDate)
      this.fromDate=new Date(currentDate.clone().startOf('month').format("MM-DD-YYYY"));
     if(!this.toDate)
      this.toDate=new Date();
    let x=this.datePipe.transform(this.fromDate,'dd-MM-yyyy');
     let y=this.datePipe.transform(this.toDate,'dd-MM-yyyy');  
     console.log("-------->dates------>",x," and ",y);
    this.customQuery=this.allTimeQuery+"&"+"where=resTime:$gte:"+x+";resTime:$lte:"+y;
    if(this.customChart)
      this.customChart.reDraw(this.customQuery);

  }
  
  getDailyResp()
  {
      this.frmSrv.getDateAnalytics(this.formID, "day").subscribe(
              resp=>{
                this.showDayChart=true;
                this.dataDailyResponse.labels=resp.seriesLabel;
                this.dataDailyResponse.series[0] = resp.seriesData;
                
                this.weekDaysChartDiv = new Chartist.Line('#weekDaysChartDiv', this.dataDailyResponse, this.optionsDailyResponse);
                this.startAnimationForLineChart(this.weekDaysChartDiv);
                
              },
              err=>{
                  console.log("Daily analytics error=",err)
              });
              this.frmSrv.getDateAnalytics(this.formID, "month").subscribe(
              resp=>{
                this.showMonthChart=true;  
                this.dataMonthlyResponse.labels=resp.seriesLabel;
                this.dataMonthlyResponse.series[0]=resp.seriesData;
                
                this.montlyChartDiv = new Chartist.Bar('#montlyChartDiv', this.dataMonthlyResponse, this.optionsMonthlyResponse, this.responsiveOptions);
                this.startAnimationForBarChart(this.montlyChartDiv);
                
              },
              err=>{
                  console.log("Daily analytics error=",err)
              });
              
              this.frmSrv.getDateAnalytics(this.formID, "hour").subscribe(
                      resp=>{
                        this.showHourChart=true;  
                        this.dataHourlyResponse.labels=resp.seriesLabel;
                          this.dataHourlyResponse.series[0]=resp.seriesData;   
                         
                          this.hourlyChartDiv = new Chartist.Bar('#hourlyChartDiv', this.dataHourlyResponse, this.optionsHourlyResponse, this.responsiveOptions);
                          this.startAnimationForBarChart(this.hourlyChartDiv);
                          
                          
                      },
                      err=>{
                          console.log("Daily analytics error=",err)
                      });
      
  }
  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 100;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 100,
              dur: 500,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };

}
