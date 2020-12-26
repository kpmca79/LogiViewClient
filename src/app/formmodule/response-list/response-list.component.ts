import { Component, OnInit, Input } from '@angular/core';
import { FormService } from '../../services/form.service'
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-response-list',
  templateUrl: './response-list.component.html',
  styleUrls: ['./response-list.component.scss']
})
export class ResponseListComponent implements OnInit {

    formID: String;
    isLoaded: boolean = false;
    title = 'mattab';
    responseData: any[];
    charts
    colProperty: any[] = [];
    dispColumns: [] = [];
    message = "this is from parent"
    chartData: any[] = []; 
    hidencols: string[] = ['comments','tags','resp_country','resp_state','resp_city','latitude','longitude','IpAddress','resTime'];
  constructor(private srv: FormService,private route: ActivatedRoute) { }

  ngOnInit() {
       this.formID = this.route.snapshot.paramMap.get("id");
       this.srv.getResonse(this.formID).subscribe(data => {
            let result = data;
            this.responseData = result.data;
            console.log("Form response data-->",this.responseData);
            this.dispColumns = result.columnNames;
            this.dispColumns.forEach(val => {
                if (val != 'null' && val!="_id" && val!="formID")
                this.colProperty.push({ name: val, dispName: val, allowDrag: true, allowHide: true });
            })

            this.isLoaded = true;
        })

  }
  loadChart(columnName)
    {
      this.message="changed by child";
      console.log("Got from child----->", this.message);
    }
    loadChartData (colName:string)
    {
          this.srv.getColumnChartData("test","formResponse",colName).subscribe(data=>{
          let result=data;
          let dataRetSet=result.data
          let colData:any[]=[];
          dataRetSet.forEach(val=>{
              colData.push([val['_id']+'',val['count']]);
          })
         this.chartData=colData;
        
      });
  }

}
