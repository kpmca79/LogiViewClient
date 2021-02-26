import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataChartComponent } from 'app/data-chart/data-chart.component';
import { FormService } from 'app/services/form.service';
import * as moment from 'moment';
import { CountriesData } from 'countries-map';
@Component({
  selector: 'analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  @ViewChild('customChart') customChart: DataChartComponent;
  @ViewChild('deviceChart') deviceChart: DataChartComponent;

  @Input() mode: string
  @Input() formID: string;
  @Input() fromDate: Date;
  @Input() toDate: Date;
  chartTitle;
  chartQuery;
  viewsQuery;
  respQuery;
  avgDuration;
  traficQuery;
  selViewRespOption = "Responses";
  fillColor = "rgba(255, 201, 65,0.1)";
  piefillColor = "rgba(255, 201, 65,1)";
  pielineColor = "#fff";
  pointColor = "rgba(255, 201, 65,1)";
  /*fillColor="rgba(235,21,21,0.1)";
  piefillColor="rgba(235,21,21,1)";
  pielineColor="#fff";
  pointColor="rgba(235,21,21,1)";*/
  viewRespMode = 1 // 0 for views 1 for response
  countryQuery: any;
  countryData = [];
  viewTitle = "Responses"
  browserQuery: any;
  browserData: any[];
  platformData: any[];
  platformQuery: string;
  deviceQuery: string;
  convertUnit = "";
  deviceData: any[];
  resolutionQuery: string;
  resolutionData: any[];
  selectedViewIndex = 1;
  grpAvgDur: string;
  chartQuery2: string;
  showRatio: boolean;
  deviceQuery2: string;
  constructor(private frmSrv: FormService, private route: ActivatedRoute, private datePipe: DatePipe) { }

  async ngOnInit() {
    console.log('Inside analytics fromDate--->', this.fromDate, " todate-->", this.toDate);
    this.updateChartTitles();
    // if(this.mode=='custom') this.chartTitle="Custom date range anaylysis";
    await this.refreshDataChart(this.fromDate, this.toDate, true)
  }
  updateChartTitles() {
    if (this.mode == 'week') this.chartTitle = "Current week " + this.viewTitle;
    if (this.mode == 'month') this.chartTitle = "Current month " + this.viewTitle;;
    if (this.mode == 'alltime') this.chartTitle = "All time " + this.viewTitle;;
  }
  async refreshDataChart(starDt: Date, endDt: Date, updateViewResp: boolean) {
    this.fromDate = starDt;
    this.toDate = endDt;
    this.refreshQueries(null);
    await this.updateCharts(updateViewResp);
  }
  summaryTabChange($event) {
    if (this.deviceChart)
      this.deviceChart.reInitChart();
  }
  reInitByParent() {
    if (this.customChart)
      this.customChart.reInitChart();
  }
  async updateCharts(updateViewResp): Promise<any> {
    let promise = new Promise<any>(async (resolve) => {
      this.countryData = []; this.deviceData = []; this.platformData = []; this.browserData = []; this.resolutionData = []; this.dataResponse = [];
      if (this.customChart)
        this.customChart.reDraw(this.chartQuery);
      if (this.deviceChart)
        this.deviceChart.reDraw(this.deviceQuery);
      this.processTrafficData();
      this.processCountryData();
      this.processBrowserData('browser');
      this.processBrowserData('os_version');
      this.processBrowserData('deviceType');
      this.processBrowserData('resolution');
      this.processViewResp();
      // console.log("Generated numbers----->",this.viewNumber);  
      resolve('');
    });
    return promise;
  }
  async processViewResp() {
    let result: any = await this.frmSrv.getChartData(this.formID, this.viewsQuery);
    console.log("Lets query for views of this.viewsQuery ", this.viewsQuery);
    console.log("Lets query for views of form ", result);
    let resp = 0.0, view = 0.0;
    if (result && result.data && result.data.series)
      view = result.data.series[0];
    result = await this.frmSrv.getChartData(this.formID, this.respQuery);
    if (result && result.data && result.data.series)
      resp = result.data.series[0];
    result = await this.frmSrv.getChartData(this.formID, this.avgDuration);
    if (view > 0) this.viewNumber[0].key = view; else this.viewNumber[0].key = 0;
    if (resp > 0) this.viewNumber[1].key = resp; else this.viewNumber[1].key = 0;
    if (resp > 0 && result && result.data && result.data.series)
      this.viewNumber[3].key = "00:" + Math.floor(result.data.series[0] / 1000);
    else
      this.viewNumber[3].key = 0 + " Sec";
    let conRate = 0.0
    if (resp > 0 && view > 0)
      conRate = (resp / view) * 100
    this.viewNumber[2].key = conRate.toFixed(0) + "%";
  }
  async processBrowserData(mode) {
    let result: any;
    if (mode == 'browser')
      result = await this.frmSrv.getChartData(this.formID, this.browserQuery);
    if (mode == 'os_version')
      result = await this.frmSrv.getChartData(this.formID, this.platformQuery);
    if (mode == 'deviceType')
      result = await this.frmSrv.getChartData(this.formID, this.deviceQuery);
    if (mode == 'resolution')
      result = await this.frmSrv.getChartData(this.formID, this.resolutionQuery);

    if (result && result.data && result.data.label) {
      let labels = result.data.label;
      let series = result.data.series;
      let total = 0;
      series.forEach(val => { total = total + val });
      if (this.selectedViewIndex == 3)
        total = total / 1000;
      let result2 = null;
      let label2: string[] = [];
      let series2: [] = [];
      if (this.selectedViewIndex == 2) {
        let newQry = this.refreshQueries(mode);
        //console.log("Krishna------Krishna------Krishna------Krishna------Krishna------",newQry)
        result2 = await this.frmSrv.getChartData(this.formID, newQry);
        if (result2.data.label) {
          label2 = result2.data.label;
          series2 = result2.data.series;
        }
      }

      labels.forEach((title, index) => {
        let obj = { title: '', value: '0', percent: '' }
        obj.title = title;
        let curVal = series[index];
        if (this.selectedViewIndex == 3) curVal = curVal / 1000;
        if (this.selectedViewIndex == 2) {
          let newper = "0%";
          if (label2.indexOf(title) > -1)
            newper = ((series2[label2.indexOf(title)] / curVal) * 100).toFixed(0) + "%";
          obj.percent = newper;
        }
        obj.value = curVal.toFixed(0);
        if (this.selectedViewIndex != 2)
          obj.percent = ((curVal / total) * 100).toFixed(0) + '%'
        if (mode == 'browser')
          this.browserData.push(obj);
        if (mode == 'os_version')
          this.platformData.push(obj);
        if (mode == 'deviceType')
          this.deviceData.push(obj);
        if (mode == 'resolution')
          this.resolutionData.push(obj);
      })
    }

  }
  async processCountryData() {
    let result = await this.frmSrv.getChartData(this.formID, this.countryQuery);
    if (result && result.data) {
      this.countryData = [];
      let cntData: any = result.data;
      let total = 0;
      console.log("cntData---------->", cntData);
      cntData.forEach(obj => { total = total + obj.total });
      if (this.grpAvgDur && this.grpAvgDur != '')
        total = total / 1000;
      let result2 = null;
      let label2: string[] = [];
      let series2: [] = [];
      if (this.selectedViewIndex == 2) {
        let newQry = this.refreshQueries('resp_country');
        result2 = await this.frmSrv.getChartData(this.formID, newQry);
        if (result2.data.label) {
          label2 = result2.data.label;
          series2 = result2.data.series;
        }
      }
      this.mapData = {};
      let strMapData = "{"
      cntData.forEach((cnt, index) => {
        let obj = { country: '', view: '', percent: '' };
        let tmpTot = cnt.total;
        if (this.grpAvgDur && this.grpAvgDur != '')
          tmpTot = tmpTot / 1000;

        obj.country = cnt.resp_country;
        let val = 0;
        obj.view = tmpTot.toFixed(0);
        let ind = label2.indexOf(obj.country);
        if (ind > -1)
          val = series2[ind];

        if (this.selectedViewIndex == 2) {
          let percen = ((val / tmpTot) * 100).toFixed(0);
          obj.percent = percen + "%";
          strMapData = strMapData + '"' + cnt.resp_countrycode + '" :{"value":' + percen + " },"
        }
        else {
          obj.percent = ((tmpTot / total) * 100).toFixed(0) + "%";
          strMapData = strMapData + '"' + cnt.resp_countrycode + '" :{"value":' + tmpTot.toFixed(0) + " },"
        }
        this.countryData.push(obj);

      });
      strMapData = strMapData.slice(0, -1);
      strMapData = strMapData + '}';

      console.log("@@@@@@@@@ strMapData", strMapData);
      this.mapData = JSON.parse(strMapData);

    }
  }
  async processTrafficData() {
    let result = await this.frmSrv.getChartData(this.formID, this.traficQuery);
    let traficData = result.data;
    //{vis:'Keyur Patel',time:'1 days ago',resp:'Yes',dur:'58 sec'},
    this.dataResponse = [];
    if (traficData)
      traficData.forEach(val => {
        let obj = { vis: '', time: new Date(), resp: '', dur: '', country: '', device: '' };
        if (val['First name'] && val['Last name'])
          obj.vis = val['First name'] + ' ' + val['Last name'];
        else
          obj.vis = val.IpAddress;
        obj.time = val.resTime;
        if (val.resp_duration > 0)
          obj.resp = 'Yes'
        else
          obj.resp = "-"
        if (val.resp_duration > 0)
          obj.dur = (val.resp_duration / 1000).toFixed(0) + ' sec'
        else
          obj.dur = "-";
        let contry: string = val.resp_country;
        contry = contry.toLowerCase().replace(" ", '-').replace("_", "-");
        obj.country = "/assets/flags/png32/" + contry + ".png";
        obj.device = val.deviceType;
        this.dataResponse.push(obj);

      });
  }
  viewRespMenu(obj) {
    this.selViewRespOption = obj.value;
    this.selectedViewIndex = this.viewNumber.indexOf(obj);
    this.viewNumber.forEach(val => {
      val.class = "";
      if (obj.value == val.value)
        val.class = "current";
    })
    if (obj.value == "Views" || obj.value == "Conversion Rate")
      this.viewRespMode = 0;
    else
      this.viewRespMode = 1;
    this.viewTitle = obj.value;
    this.refreshDataChart(this.fromDate, this.toDate, false);
    console.log("Big menu index clicked is ", obj);
  }
  refreshQueries(grpMode: string): string {

    let x = this.datePipe.transform(this.fromDate, 'dd-MM-yyyy');
    let y = this.datePipe.transform(this.toDate, 'dd-MM-yyyy');
    let qryRespView = ";resp_duration:$gte:" + this.viewRespMode;
    let qryWhere = "&where=resTime:$gte:" + x + ";resTime:$lte:" + y;
    let recentOrder = "&orderBy=resTime:-1";
    let totalOrder = "&orderBy=total:-1";



    this.convertUnit = "";
    this.grpAvgDur = ""
    if (this.selectedViewIndex == 3) {
      this.grpAvgDur = ":avg:resp_duration"
      this.convertUnit = "/1000";
    }
    if (grpMode) {
      qryRespView = ";resp_duration:$gte:" + 1;
      let qry = "groupBy=" + grpMode + this.grpAvgDur + qryWhere + qryRespView + totalOrder;
      return qry;
    }
    this.chartQuery = "groupBy=resTime-date" + this.grpAvgDur + qryWhere + qryRespView;
    this.chartQuery2 = null;
    this.showRatio = false;
    if (this.selectedViewIndex == 2) {
      this.chartQuery2 = "groupBy=resTime-date" + qryWhere + ";resp_duration:$gte:" + 1;
      this.showRatio = true;
    }

    this.viewsQuery = "groupBy=formID" + qryWhere + ";resp_duration:$gte:0";
    this.respQuery = "groupBy=formID" + qryWhere + ";resp_duration:$gte:1";
    this.avgDuration = "groupBy=formID:avg:resp_duration" + qryWhere + ";resp_duration:$gte:1";
    this.traficQuery = "select=First name;Last name;IpAddress;resTime;resp_duration;resp_country;resp_countrycode;deviceType" + qryWhere + qryRespView + recentOrder;
    this.countryQuery = "groupBy=resp_country;resp_countrycode" + this.grpAvgDur + qryWhere + qryRespView + totalOrder;

    this.browserQuery = "groupBy=browser" + this.grpAvgDur + qryWhere + qryRespView + totalOrder;
    this.platformQuery = "groupBy=os_version" + this.grpAvgDur + qryWhere + qryRespView + totalOrder;
    this.deviceQuery = "groupBy=deviceType" + this.grpAvgDur + qryWhere + qryRespView + totalOrder;
    this.deviceQuery2 = "groupBy=deviceType" + this.grpAvgDur + qryWhere + ";resp_duration:$gte:1" + totalOrder;

    console.log("ramramramramramramramramramramramram deviceQuery=", this.deviceQuery);
    this.resolutionQuery = "groupBy=resolution" + this.grpAvgDur + qryWhere + qryRespView + totalOrder;

    this.updateChartTitles();
    return '';
  }
  mapData: CountriesData = {
    'IN': { 'value': 416 },
    'China': { 'value': 94 },
    'FR': { 'value': 255 }
  };
  dataResponseHeader = ['Visitors', 'Date', 'Response', 'Duration', 'Country', 'Device'];
  dataResponse = [];
  viewNumber = [{ key: 0, value: "Views", class: '' }, { key: 0, value: "Responses", class: 'current' }, { key: "0.0%", value: "Conversion Rate", class: '' }, { key: "00:00", value: "Avg Time", class: '' }];


}
