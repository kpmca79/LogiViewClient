import { DatePipe } from '@angular/common';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataChartComponent } from 'app/data-chart/data-chart.component';
import { FormService } from "app/services/form.service";
import * as Chartist from 'chartist';
import * as moment from 'moment';

import {CalendarModule} from 'primeng/calendar';

import { CountriesData } from 'countries-map';
import { AnalyticsComponent } from 'app/formmodule/analytics/analytics.component';



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
    @ViewChild('customChartTab') customChartTab:AnalyticsComponent;
    /*Highcharts: typeof Highcharts = Highcharts;*/
    chartConstructor = "mapChart";
    chartData = [{ code3: "ABW", z: 105 }, { code3: "AFG", z: 35530 }];
    mapData: CountriesData = {
      'ES': { 'value': 416 },
      'GB': { 'value': 94 },
      'FR': { 'value': 255 }
    };
    dataResponseHeader=['Visitors','Date','Response','Duration','Country','Device'];
    fromDate;
    toDate;
    weekStartDate:Date;
    weekEndDate;
    monthStartDate;
    monthEndDate;
    allTimeStartDate;
    allTimeEndDate;

    allTimeQuery="groupBy=resTime:date"
    currentWeekQuery="groupBy=resTime:date"
    currentMonthQuery;
    customQuery
    fillColor="rgba(239,189,80,0.2)";
    pointColor="rgba(239,189,80,0.7)";

    tmpFromDate=new Date();
    tmpToDate=new Date();

    googleMapAPIKey="AIzaSyDSAywz0ynKkTjasyvpMl_NmQ3vjTV7YPQ";

/*
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
                              ];*/
  constructor(private frmSrv: FormService,private route: ActivatedRoute,private datePipe: DatePipe) { }
  formID:string;
  timeDailyData:TimeData[];
  
  
  
  dataRead=false;
  
  
  ngOnInit() {
    

    
          this.formID = this.route.snapshot.paramMap.get( "id" );
          var currentDate = moment();
          let currDate=new Date();
          let nextDay=new Date();
          nextDay.setDate(currDate.getDate()+1)
          this.weekStartDate = new Date(currentDate.clone().startOf('week').format("MM-DD-YYYY"));
          //this.weekEndDate = new Date(currentDate.clone().endOf('week').format("MM-DD-YYYY"));
          this.weekEndDate=nextDay;
          this.monthStartDate = new Date(currentDate.clone().startOf('month').format("MM-DD-YYYY"));
          //this.monthEndDate = new Date(currentDate.clone().endOf('month').format("MM-DD-YYYY"));
          this.monthEndDate=nextDay;
          this.allTimeStartDate=new Date();
          this.allTimeStartDate.setDate(new Date().getDate()-(365*3));
          this.allTimeEndDate=nextDay;
          this.fromDate=this.monthStartDate;
          this.toDate=nextDay;
          
          
  }
  tabChangeEvent($event){
    if(this.customChartTab)
      this.customChartTab.reInitByParent();
  }
  show() {
    if(this.customChartTab)
      this.customChartTab.refreshDataChart(this.fromDate,this.toDate,true);

  }
  
  /*getDailyResp()
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
  };*/

}
