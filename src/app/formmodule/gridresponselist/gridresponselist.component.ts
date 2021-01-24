import { Component, OnInit, ViewChild } from '@angular/core';
import { FormService } from '../../services/form.service'
import { ActivatedRoute } from "@angular/router";

import { ColDef, GridOptions, IGetRowsParams } from "ag-grid-community/main";
import * as moment from 'moment';
import { DatePipe, formatDate } from '@angular/common';



@Component({
  selector: 'app-gridresponselist',
  templateUrl: './gridresponselist.component.html',
  styleUrls: ['./gridresponselist.component.scss']
})
export class GridresponselistComponent implements OnInit {
  @ViewChild('myGrid', { static: false }) myGrid: any;
  formID: String;
  isLoaded: boolean = false;
  title = 'mattab';
  responseData: any[];
  charts
  colProperty: any[] = [];
  dispColumns: any[] = [];
  message = "this is from parent"
  chartData: any[] = [];
  hidencols: string[] = ['resp_country', 'resp_state', 'resp_city', 'latitude', 'longitude', 'IpAddress', 'resTime'];

  //ag-grid vadiables start
  gridApi;
  gridColumnApi;
  columnDefs: ColDef[] = []
  gridTheme = "ag-theme-alpine";
  infiniteInitialRowCount = 10;
  maxConcurrentDatasourceRequests = 2;
  cacheOverflowSize = 5;

  gridOptions: GridOptions = {
    // headerHeight: 45,
    //rowHeight: 30,
    animateRows: true,

    // suppressDragLeaveHidesColumns: true,
    // enableCharts: true,
    groupHideOpenParents: true,
    //groupUseEntireRow:true,
    enableRangeSelection: true,
    rowGroupPanelShow: "always",
    //pagination: true,
    // paginationPageSize: 10,
    // cacheOverflowSize: 50,
    paginationAutoPageSize: true,
    infiniteInitialRowCount: 10,
    maxConcurrentDatasourceRequests: 2,

  }
  autoGroupColumnDef = {

    minWidth: 250,
    comparator: function (valueA, valueB) {
      if (valueA == null || valueB == null) return valueA - valueB;
      if (!valueA.substring || !valueB.substring) return valueA - valueB;
      if (valueA.length < 1 || valueB.length < 1) return valueA - valueB;
      return strcmp(
        valueA.substring(1, valueA.length),
        valueB.substring(1, valueB.length));
    },
  }

  defaultColDef = {
    flex: 1,
    minWidth: 140,
    //width: 140,
    sortable: true,
    resizable: true,
    autoHeight: true,
    floatingFilter: true,
  };

  //ag-grid vadiables end
  hiddenTypes = ['survey', 'dropdown', 'upload', 'signature', 'file','productlist']
  numericTypes = ['number', 'rating', 'numberspinner']
  hiddenColList: string[] = ["id", 'title', "_id", "formID", "comments", "tags", "longitude", "latitude", "IpAddress", "resp_country", "resp_state", "resp_city", "resTime"];
  groupCols: string[] = ['State', 'City', 'Lasn name'];
  sideBar = {
    toolPanels: ['columns', 'filters'],
    defaultToolPanel: '',
  };
  statusBar = {
    statusPanels: [
      /*  {
          statusPanel: 'agTotalAndFilteredRowCountComponent',
          align: 'left',
        },*/
      {
        statusPanel: 'agTotalRowCountComponent',
        align: 'right',
      },
      { statusPanel: 'agFilteredRowCountComponent' },
      { statusPanel: 'agSelectedRowCountComponent' },
      { statusPanel: 'agAggregationComponent' },
    ],
  };

  constructor(public datepipe: DatePipe, private srv: FormService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.formID = this.route.snapshot.paramMap.get("id");


    this.srv.getResonse(this.formID).subscribe(data => {
      let result = data;
      this.dispColumns = result.columnNames;
      let textFilter = 'agTextColumnFilter';
      let dateFilter = 'agDateColumnFilter';
      this.dispColumns.forEach(val => {
        let isHidden = false;
        let isGroup = false;
        if (val != null && !this.hiddenColList.includes(val.name) && !this.hiddenTypes.includes(val.type)) {
          console.log("field type=", val.type);
          var colDf: ColDef = {
            chartDataType: 'series',
            headerName: val.name,
            flex: 1,
            resizable: true,
            field: val.id,
            enableRowGroup: true,
            filter: textFilter,
            sortable: true,
            // editable:true,
          };

          if (val.type && val.type == "date-picker") {
            colDf.valueGetter = function (row: any) {
              if (row.colDef.field) {
                
                let currentFieldID = row.colDef.field;
                if(row.data)
                {
                  if (row.data[currentFieldID] && row.data[currentFieldID].value) {
                    return formatDate(row.data[currentFieldID].value, "dd-MMM-yyyy", 'en-US');
                   }
                }
              }
            };
          }
          if (val.type && this.numericTypes.includes(val.type)) {
            colDf.filter = 'agNumberColumnFilter';
          }
          /*if (val.type && val.type == "rating") {
            colDf.filter = 'agNumberColumnFilter';
            colDf.valueGetter = function (row: any) {
              if (row.colDef.field) {
                let currentFieldID = row.colDef.field;
                if (row.data[currentFieldID]) {
                  return Number.parseInt(row.data[currentFieldID].value);
                }
              }
            };
          }*/
          this.columnDefs.push(colDf);
        }
      });
      this.columnDefs.push({
        headerName: 'Response Time', field: "resTime",
        cellRenderer: (data) => { return data.value ? moment(data.value).format('DD-MMM-YY HH:mm') : ''; },
        sortable: true, enableRowGroup: true
      });
      this.isLoaded = true;
    }, error => { console.log(error); })


  }
  onGridReady(param) {
    console.log("on gridready method called");
    this.gridApi = param.api;
    this.getFormResponseData(param);

  }
  modelUpdated() {
    console.log("modle updated called");
  }
  onPageChage(param) {
    console.log("page change event called")
  }
  getFormResponseData(param) {
    this.srv.getResonse(this.formID).subscribe(data => {
      let result = data;
      //console.log("setting row data---->",result.data);
      param.api.setRowData(result.data);
    });

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

}
function strcmp(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}
