import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    showHourChart=false;
    showMonthChart=false;
    showDayChart=false;
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
  constructor(private frmSrv: FormService,private route: ActivatedRoute) { }
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
