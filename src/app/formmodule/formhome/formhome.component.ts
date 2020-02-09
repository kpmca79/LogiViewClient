import { Component, OnInit } from '@angular/core';
import { FormService } from "app/services/form.service";
import * as Chartist from 'chartist';
export interface TimeData{
    _id: string,
    count: number
}

@Component({
  selector: 'app-formhome',
  templateUrl: './formhome.component.html',
  styleUrls: ['./formhome.component.scss']
})
export class FormhomeComponent implements OnInit {

    max=-1;
    goodDay='Sunday';
    maxhrCount=-1;
    maxHr='';
    optionsDailyResponse: any = {
            lineSmooth: Chartist.Interpolation.cardinal({tension: 0}),
            low: 0, high: 50, 
            chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
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
  constructor(private frmSrv: FormService) { }
  formID="5de393f63f23f009e8263900";
  timeDailyData:TimeData[];
  dailyCount=[0,0,0,0,0,0,0];
  monthlyCount=[0,0,0,0,0,0,0,0,0,0,0,0];
  
  dataDailyResponse: any = {
          labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
          series: [
              [0,0,0,0,0,0,0]
          ]
      };
   dataMonthlyResponse = {
          labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
          series: [
            [0,0,0,0,0,0,0,0,0,0,0,0]

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
      
      
          this.getDailyResp();
          for(let i=0;i<24;i++)
          {    this.dataHourlyResponse.labels.push(""+i+"");
               this.dataHourlyResponse.series[0].push(0);
          }
          

          
  }
  getDailyResp()
  {
      this.frmSrv.getDateAnalytics(this.formID, "day").subscribe(
              resp=>{
                  this.timeDailyData=resp.data;
                let max=-1;
                let goodDay="";
                  this.timeDailyData.forEach(rec=>{
                      if(rec._id=="1")
                      { 
                          this.dailyCount[0]=rec.count;
                          if(rec.count>max)
                          {
                              max=rec.count;
                              goodDay='Sunday';
                          }
                      }
                      else  if(rec._id=="2")
                      {
                          this.dailyCount[1]=rec.count;
                          if(rec.count>max)
                          {
                              max=rec.count;
                              goodDay='Monday';
                          }
                      }
                          
                      else  if(rec._id=="3")
                      {
                          this.dailyCount[2]=rec.count;
                          this.dailyCount[1]=rec.count;
                          if(rec.count>max)
                          {
                              max=rec.count;
                              goodDay='Tuesday';
                          }
                      }
                      else  if(rec._id=="4"){
                          this.dailyCount[3]=rec.count;
                          if(rec.count>max)
                          {
                              max=rec.count;
                              goodDay='Wednesday';
                          }
                      }
                      else  if(rec._id=="5"){
                          this.dailyCount[4]=rec.count;
                          if(rec.count>max)
                          {
                              max=rec.count;
                              goodDay='Thursday';
                          }
                      }
                      else  if(rec._id=="6"){
                          this.dailyCount[5]=rec.count;
                          if(rec.count>max)
                          {
                              max=rec.count;
                              goodDay='Friday';
                          }
                      }
                      else  if(rec._id=="7"){
                          this.dailyCount[6]=rec.count;
                          if(rec.count>max)
                          {
                              max=rec.count;
                              goodDay='Saturday';
                          }
                      }
                      this.dataDailyResponse.series[0]=this.dailyCount;
                      this.max=max;
                      this.goodDay=goodDay;
                      
                  })
                  console.log("Daily analytics data=",this.timeDailyData);
                  this.optionsDailyResponse.high=this.timeDailyData[0].count;
                  this.weekDaysChartDiv = new Chartist.Line('#weekDaysChartDiv', this.dataDailyResponse, this.optionsDailyResponse);
                  this.startAnimationForLineChart(this.weekDaysChartDiv);
              },
              err=>{
                  console.log("Daily analytics error=",err)
              });
              this.frmSrv.getDateAnalytics(this.formID, "month").subscribe(
              resp=>{
                  this.timeDailyData=resp.data;
                  this.timeDailyData
                  console.log("###########",this.timeDailyData);
                  this.timeDailyData.forEach(rec=>{
                      if(rec._id=="1") this.monthlyCount[0]=rec.count;
                      if(rec._id=="2") this.monthlyCount[1]=rec.count;
                      if(rec._id=="3") this.monthlyCount[2]=rec.count;
                      if(rec._id=="4") this.monthlyCount[3]=rec.count;
                      if(rec._id=="5") this.monthlyCount[4]=rec.count;
                      if(rec._id=="6") this.monthlyCount[5]=rec.count;
                      if(rec._id=="7") this.monthlyCount[6]=rec.count;
                      if(rec._id=="8") this.monthlyCount[7]=rec.count;
                      if(rec._id=="9") this.monthlyCount[8]=rec.count;
                      if(rec._id=="10") this.monthlyCount[9]=rec.count;
                      if(rec._id=="11") this.monthlyCount[10]=rec.count;
                      if(rec._id=="12") this.monthlyCount[11]=rec.count;
                      
                      this.dataMonthlyResponse.series[0]=this.monthlyCount;
                      
                  })
                  console.log("Monthly analytics data=",this.monthlyCount);
                  this.optionsMonthlyResponse.high=this.timeDailyData[0].count;
                  this.montlyChartDiv = new Chartist.Bar('#montlyChartDiv', this.dataMonthlyResponse, this.optionsMonthlyResponse, this.responsiveOptions);
                  
                  this.startAnimationForBarChart(this.montlyChartDiv);
                  
              },
              err=>{
                  console.log("Daily analytics error=",err)
              });
              
              this.frmSrv.getDateAnalytics(this.formID, "hour").subscribe(
                      resp=>{
                          this.timeDailyData=resp.data;
                          console.log("###########",this.timeDailyData);
                          this.timeDailyData.forEach(rec=>
                               this.dataHourlyResponse.series[0][Number.parseInt(rec._id)]=rec.count)
                          let maxHrCount=-1;
                          let maxHr=0;
                          console.log("Hourly analytics data=",  this.dataHourlyResponse.series[0]);
                          let timezone=this.frmSrv.getClientTimezone();
                          
                          
                          this.dataHourlyResponse.series[0].forEach(( value, index ) => {
                              if ( maxHrCount < value ) {
                                  maxHrCount = value;
                                  maxHr = index;
                              }
                          })
                          this.maxhrCount=maxHrCount;
                          this.maxHr=maxHr+ ' received '+maxHrCount+' response';
//                          this.optionsHourlyResponse.high=this.timeDailyData[0].count;
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
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
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
