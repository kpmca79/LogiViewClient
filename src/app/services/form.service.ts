import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Form } from '../model/Form';
import { User } from '../model/User';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class FormService {
    public resp: any;
    public formSelfLink: any;
    public result: any;
    // private url = "http://192.168.99.100:8080";
    private url = '';
    private repoURL = '/api/file';
    //https://cors-anywhere.herokuapp.com/
    proxyURL = 'https://cors-anywhere.herokuapp.com/'
//    publiIPURL="https://jsonip.com";
    publiIPURL = 'http://api.ipify.org/?format=json&timestamp=34ds34343'
    private newURL = '/api';
   
//    ipDetailURL="https://api.hackertarget.com/geoip/?q=";
    ipDetailURL="https://ipapi.co/";
//    https://ipapi.co/157.32.224.228/json


  constructor(private http: HttpClient) { }



    getFields(): Observable<any> {
        return this.http.get<any>('/api/formfield');

    }
    getForms(): Observable<any> {
        return this.http.get<any>('/api/forms');

    }
    getForm(): Observable<any> {
        return this.http.get<any>('/api/formview');

    }
     public  saveForm(form: Form, formId: String): Observable<any> {
       form.id = null;
       let saveURL = 'api/forms';
       console.log('saving form formid=', formId);
       if (formId) {
           saveURL = saveURL + '/' + formId;
       }
       console.log('saving form saveURL=', saveURL);

//       let strJson=JSON.stringify(form);
     /*  let strJson=JSON.stringify(form);

//       console.log("posting data=",JSON.stringify(form));

        this.http.post('http://localhost:8080/form', JSON.parse(strJson))
        .subscribe(response=>{
                                let x=response;
                                let y=x._links.self.href;
                                this.formSelfLink=y;

        });
        return this.formSelfLink;*/
       if (formId) {
           return this.http.put(saveURL, JSON.parse(JSON.stringify(form)));
       } else {
           return this.http.post(saveURL, JSON.parse(JSON.stringify(form)));
       }
    }
    public viewForm(formID: String) : Observable<any> {
        return this.http.get('/api/forms/' + formID);
    }
    public getDateAnalytics(formID: String,duration:String) : Observable<any> {
        let url='/api/'+formID+"/response/analytics/"+duration+"?tz="+this.getTimezone();
        return this.http.get(url);
    }
    public  uploadResource(imageToUpload: File) : Observable<any> {

        const formData: FormData = new FormData();
         formData.append('file', imageToUpload)
        return this.http.post(this.repoURL, formData);
     }

    public downloadImage(imageURL: any) : Observable<any> {

        let headers = new HttpHeaders();
        headers.append("Origin", "http://localhost:4200");
        headers.append("X-Requested-With", "http://localhost:4200");
//        headers.append('Access-Control-Allow-Credentials', 'true');
        headers.append('withCredentials', 'true');
        
//        Access-Control-Allow-Credentials: true
//        headers.set("allowCredentials", 'false');  
//        headers.set("Access-Control-Allow-Origin", '*');
        
        const options = { responseType: 'blob' as 'json', headers }
        let tmpUrl=this.getProxyURL(imageURL);
        console.log(tmpUrl);
        return this.http.get<Blob>(this.getProxyURL(imageURL), options);

    }
    
    public corsPubURL(url: any) : Observable<any>
    {
        let headers = new HttpHeaders();
        headers.append("Origin", "http://localhost:4200");
        headers.append("X-Requested-With", "http://localhost:4200");
        headers.append('withCredentials', 'true');
        let tmpUrl=this.getProxyURL(url);
        console.log("corsPubURL=",tmpUrl);
        return this.http.get(this.getProxyURL(url), {headers});
    }
    
   
    getProxyURL(url: string): string {
        return this.proxyURL + url;
    }
    getPublicIP(): Observable<any> {
        return this.corsPubURL(this.publiIPURL);
    }
   getIPDetail(ip: String)
   {
       let newIPDetailURL=this.ipDetailURL+ip+"/json";
       return this.corsPubURL(newIPDetailURL);
   }

    public  saveResponse(formID: any, response: String): Observable<any> {
       let saveURL = '/api/response';
       console.log('saving form response formid=', formID);
       console.log('saving form response response=', response);
       console.log('saving form saveURL=', saveURL);
       return this.http.post(saveURL, JSON.parse(JSON.stringify(response)));
    }
  getResonse(formID: String): Observable<any> {
           let saveURL = "/api/"  + formID + '/response';
           console.log('Calling URL for getting responses-->', saveURL);
           return this.http.get<any>(saveURL);
  }
  getColumnChartData(database: String, collection: String, colName: String): Observable<any> {
      let path = '/api/getTableData/' + database + '/' + collection + '?fields=' + colName;
      return this.http.get<any>(path);
  }
  
  // COMMON METHODS
  public addTimeToDate( time: String, dt: Date ): Date {
      if ( time ) {
          let hh = Number.parseInt( time.split( ":" )[0] );
          let mi = Number.parseInt( time.split( ":" )[1] );
          dt.setHours( hh, mi );
      }
      return dt;

  }
  public getTime( dt: Date ): string {
      console.log("Inside get time ",dt);
      let hh = dt.getHours();
      let mi = dt.getMinutes();
      let strHH;
      let strMi
      if ( hh < 10 )
          strHH = "0" + hh;
      else
          strHH = "" + hh;
      if ( mi < 10 )
          strMi = "0" + mi;
      else
          strMi = "" + mi;

      console.log( "returning time is ", strHH, ":", strMi );
      return strHH + ":" + strMi;
  }
  getFormatedDate( dt: Date ) {

      console.log( dt );
      return ( dt.getDate() + "/" + ( dt.getMonth() + 1 ) + "/" + dt.getFullYear() + " " + this.getTime( dt ) );
  }
  public getClientTimezone(): string {
      let dt = new Date();
      let offset = dt.getTimezoneOffset();

      let sign = "-"
      if ( offset < 0 ) {
          sign = '+'
          offset = -offset;
      }
      let h = Math.floor( offset / 60 );
      let min = offset - ( h * 60 )
      let timez = "GMT " + sign + h + ":" + min;

      return timez;
  }
  public getTimezone(): string {
      let dt = new Date();
      let offset = dt.getTimezoneOffset();
      let hh="";
      let minut="";
      let sign = "-"
      if ( offset < 0 ) {
          sign = '+'
          offset = -offset;
      }
      let h = Math.floor( offset / 60 );
      
      let min = offset - ( h * 60 )
      hh=""+h
      if(h<10)
              hh="0"+h;
      minut=""+min;
      if(min<10)
            minut="0"+min;        
              
      if(sign=='+')
              sign="%2B";
      let timez = sign + hh + ":" + minut;
              

      return timez;
  }
  showNotification(from, align,msg,msgType){
      
      const type = ['','info','success','warning','danger'];
      
      let color = Math.floor((Math.random() * 4) + 1);
      if(msgType=='s')
          {
              color = 2;
          }

      $.notify({
          icon: "notifications",
          message: msg

      },{
          type: type[color],
          timer: 100,
          delay:1000,
          placement: {
              from: from,
              align: align
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }
  // END COMMON METHODS
}
