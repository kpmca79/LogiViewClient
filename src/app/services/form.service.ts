import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Form } from '../model/Form';
import { PaymentDetail } from '../model/PaymentDetail';
import { User } from '../model/User';
import { Validators, FormControl } from "@angular/forms/forms";
import { FormResponse } from 'app/model/FormResponse';
import { FrmResponse } from 'app/model/Respons';

declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class FormService {
    
    clearResponseFields=['_id','title','resp','resTime'] 
    
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
    icons:string[];
     colorRegExp=/color:#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3});/gi;
     bgcRegExp=/background:#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3});/gi;
     flxGrwRegExp=/flex-grow:([015.]{3});/gi;
     fntSizeRegExp=/font-size:[0-9][0-9]px;/gi;
     fntFamilyRegExp=/font-family:.*?(?=;)/gi;
     attValRegExp=/#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3});/gi;
     attSizeRegExp=/[0-9]{1,2}px;/gi;
     borderwidthRedExp=/border-width:[0-9]{1,2}px;/gi;
     borderColorRegExp=/border-color:#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3});/gi;
     
     
  constructor(private http: HttpClient) { }



    getFields(): Observable<any> {
        return this.http.get<any>('/api/formfield');

    }
    getForms(searchStr): Observable<any> {
        let qryParam="";
        if(searchStr)
            qryParam="?"+searchStr;
        console.log("INSIDE form service getForms calling api "+'/api/forms'+qryParam);
        return this.http.get<any>('/api/forms'+qryParam);

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
     public  getPaymentHash(paymentDetail:PaymentDetail): Observable<any> {
         let url='/api/payment/hash';
         console.log('get Hash for PaymentDetails=', paymentDetail);
         return this.http.post(url, JSON.parse(JSON.stringify(paymentDetail)));
         
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
        headers.append("Origin", "https://localhost:4200");
        headers.append("X-Requested-With", "https://localhost:4200");
        headers.append('Access-Control-Allow-Credentials', 'true');
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
        headers.append("origin", "http://localhost:4200");
        headers.append("X-Requested-With", "http://localhost:4200");
        headers.append("Access-Control-Allow-Origin", "http://localhost:4200");
        
        headers.append('withCredentials', 'true');
       
        let tmpUrl=this.getProxyURL(url);
        console.log("Calling url",tmpUrl);
        return this.http.get(this.getProxyURL(url), {headers});
    }
    
   public getRandom():string
   {
       return Math.random().toString(36).substr(2, 9);
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

    public  saveResponseNew(formID: any, response: FrmResponse): Observable<any> {
        let saveURL = '/api/form/'+formID+'/response';
        console.log('saving form response formid=', formID);
        console.log('saving form response response=', response);
        console.log('saving form saveURL=', saveURL);
        
        return this.http.post(saveURL, JSON.parse(JSON.stringify(response)));
     }
  public  updateResponse(responseID: any, parentResponse: any): Observable<any> {
       let saveURL = '/api/response/'+responseID;
       //clear response before save
       let response=JSON.parse(JSON.stringify(parentResponse)); 
       this.clearResponseFields.forEach(val=>{
           if(response[val])
                delete response[val];
       });
     
       console.log('updating  response responseid=', responseID);
       console.log('updating response response=', response);
       console.log('updating response saveURL=', saveURL);
       return this.http.put(saveURL, response);
    }
  getResonse(formID: String): Observable<any> {
           let saveURL = "/api/"  + formID + '/response';
           console.log('Calling URL for getting responses-->', saveURL);
           return this.http.get<any>(saveURL);
  }
  getResonseWithFilter(formID: String,postBody:any): Observable<any> {
    let saveURL = "/api/"  + formID + '/getResponse';
    console.log('Calling URL for getting responses-->', saveURL);
    return this.http.post<any>(saveURL,JSON.parse(JSON.stringify(postBody)));
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
  styleParse(src:string,element:string,value:string):string{
    let dest="";
    
    if(!src)
        src="";
    switch(element)
    {
        case 'flexgrow':{
            if(!src.match(this.flxGrwRegExp))
                dest=src+"flex-grow:"+value+";";
            else
                dest=src.replace(this.flxGrwRegExp,"flex-grow:"+value+";");
            break;
        }
        case 'fntColor':{
            if(!src.match(this.colorRegExp))
                dest=src+"color:"+value+";";
            else
                dest=src.replace(this.colorRegExp,"color:"+value+";");
            break;
        }
        case 'fntSize':{
            if(!src.match(this.fntSizeRegExp))
                dest=src+"font-size:"+value+"px;";
            else
                dest=src.replace(this.fntSizeRegExp,"font-size:"+value+"px;");
            break;
        }
        case 'fntFamily':{
            if(!src.match(this.fntFamilyRegExp))
                dest=src+"font-family:"+value+";";
            else
                dest=src.replace(this.fntFamilyRegExp,"font-family:"+value);
            break;
        }
        case 'bgColor':{
            console.log("####1####src######@@@@@@===",src);
            if(!src.match(this.bgcRegExp))
                dest=src+"background:"+value+";";
            else
                dest=src.replace(this.bgcRegExp,"background:"+value+";");
            break;
        }
            
    }
    return dest;
  }
  
  getStyleValue( src: string, element: string ): string {
      let dest = "";
      let src2 = ""
      if ( !src )
          src = "";
      switch ( element ) {
          case 'fntColor': {
              if ( src.match( this.colorRegExp ) ) {
                  src2 = src.match( this.colorRegExp )[0];
                  if ( src2.match( this.attValRegExp ) )
                      return src2.match( this.attValRegExp )[0].replace( ";", "" );
                  else
                      return null;
              }
              break;
          }
          case 'borderColor': {
              if ( src.match( this.borderColorRegExp) ) {
                  src2 = src.match( this.borderColorRegExp )[0];
                  if ( src2.match( this.attValRegExp ) )
                      return src2.match( this.attValRegExp )[0].replace( ";", "" );
                  else
                      return null;
              }
              break;
          }
          case 'bgColor': {
              if ( src.match( this.bgcRegExp ) ) {
                  src2 = src.match( this.bgcRegExp )[0];
                  if ( src2.match( this.attValRegExp ) )
                      return src2.match( this.attValRegExp )[0].replace( ";", "" );
                  else
                      return null;
              }
              break;
          }
          
          
          case 'fntSize': {
              console.log('fntSize src=',src)
              if ( src.match( this.fntSizeRegExp ) ) {
                  
                  src2 = src.match( this.fntSizeRegExp )[0];
                  console.log('fntSize src=',src2)
                  if ( src2.match( this.fntSizeRegExp ) ){
                      console.log('fntSize src.match=',src2.match( this.attSizeRegExp )[0]);
                      return src2.match( this.attSizeRegExp )[0].replace( ";", "" );}
                  else
                      return null;
              }
              break;

          }
          case 'borderwidth': {
              console.log('borderwidth src=',src)
              
              if ( src.match( this.borderwidthRedExp ) ) {
                  
                  src2 = src.match( this.borderwidthRedExp )[0];
                  console.log('borderwidth src=',src2)
                  if ( src2.match( this.attSizeRegExp ) ){
                      console.log('borderwidth src.match=',src2.match( this.attSizeRegExp )[0]);
                      return src2.match( this.attSizeRegExp )[0].replace( ";", "" );}
                  else
                      return null;
              }
              
          }
          break;

      }
      return null;
    }
  getMatIcons():String[]
  {
     
      if(this.icons&&this.icons.length>1)
          return this.icons;
      this.icons=[];
      this.icons.push("account_circle");
      this.icons.push("account_box");
      this.icons.push("face");
      this.icons.push("perm_identity");
      this.icons.push("record_voice_over");
      this.icons.push("rowing");
      this.icons.push("contacts");
      this.icons.push("sentiment_satisfied_alt");
      this.icons.push("how_to_reg");
      this.icons.push("insert_emoticon");
      this.icons.push("wc");
      this.icons.push("sentiment_very_dissatisfied");
      this.icons.push("sentiment_very_satisfied");
      this.icons.push("sentiment_satisfied");
      this.icons.push("sports_handball");
      
      //hand symbol
      this.icons.push("thumb_up_alt");
      this.icons.push("thumb_down_alt");
      this.icons.push("touch_app");
      this.icons.push("pan_tool");
      
      //communications & devices
      this.icons.push("feedback");
      this.icons.push("calendar_today");
      this.icons.push("perm_phone_msg");
      this.icons.push("open_in_browser");
      this.icons.push("important_devices");
      this.icons.push("settings_cell");
      this.icons.push("settings_voice");
      this.icons.push("contact_mail");
      this.icons.push("contact_phone");
      this.icons.push("contacts");
      this.icons.push("dialer_sip");
      this.icons.push("phone");
      this.icons.push("email");
      this.icons.push("forum");
      this.icons.push("location_on");
      this.icons.push("sd_storage");
      this.icons.push("signal_cellular_alt");
      this.icons.push("laptop");
      this.icons.push("mouse");
      this.icons.push("keyboard_hide");
      this.icons.push("router");
      this.icons.push("speaker");
      this.icons.push("headset");
      this.icons.push("edit");
      this.icons.push("local_see");
      this.icons.push("local_printshop");
      this.icons.push("share");
      this.icons.push("language");
      this.icons.push("public");
      
      
      
   
      
      //shopping & travel
      this.icons.push("airline_seat_flat");
      this.icons.push("airline_seat_recline_extra");
      this.icons.push("account_balance");
      this.icons.push("airplanemode_active");
      this.icons.push("departure_board");
      this.icons.push("directions_bus");
      this.icons.push("directions_car");
      this.icons.push("directions_transit");
      this.icons.push("local_gas_station");
      this.icons.push("restaurant");
      this.icons.push("two_wheeler");
      this.icons.push("local_bar");
      this.icons.push("local_cafe");
      this.icons.push("local_hospital");
      this.icons.push("local_mall");
      this.icons.push("menu_book");
      this.icons.push("fastfood");
      this.icons.push("local_grocery_store");
      this.icons.push("business_center");
      this.icons.push("apartment");
      this.icons.push("airport_shuttle");
      this.icons.push("meeting_room");
  
      
      //other objects
      this.icons.push("account_circle");
      this.icons.push("account_circle");
      this.icons.push("account_circle");
      this.icons.push("account_circle");
      this.icons.push("account_circle");
      this.icons.push("account_circle");
      this.icons.push("account_circle");
      
      
      this.icons.push("school");
      this.icons.push("local_library");
      this.icons.push("emoji_objects");
      this.icons.push("cake");
      this.icons.push("emoji_events");
      this.icons.push("beach_access");
      this.icons.push("house");
      this.icons.push("local_parking");
      this.icons.push("brush");
      this.icons.push("colorize");
      this.icons.push("color_lens");
      this.icons.push("star");
      this.icons.push("card_giftcard");
      
      
      //time objects
      this.icons.push("timer");
      this.icons.push("alarm");
      this.icons.push("account_circle");
      this.icons.push("account_circle");
      this.icons.push("account_circle");
      this.icons.push("account_circle");
      this.icons.push("account_circle");
      this.icons.push("account_circle");
      
      
      this.icons.push("3d_rotation");
      return this.icons;
  } 
  getCurrencya():Map<string,string>
  {
//      Ref: http://cactus.io/resources/toolbox/html-currency-symbol-codes
      
      let currencyMap=new Map<string,string>();
      currencyMap.set("dollar","&#36;");
      currencyMap.set("cent","&#162;");
      currencyMap.set("pound","&#163;");
      currencyMap.set("Yen","&#165;");
      currencyMap.set("euro"," &#128;");
      currencyMap.set("rupee","&#x20B9;");
      currencyMap.set("won","&#8361");
      currencyMap.set("lira","&#8356;");
      return currencyMap;
      
      
      
  }
  getCurrency():any[]
  {
          let currency=[];
          currency.push({name:"United States dollar",value:"USD"});
          currency.push({name:"Japanese yen",value:"JPY"});
          currency.push({name:"Pound sterling",value:"GBP"});
          currency.push({name:"Australian dollar",value:"AUD"});
          currency.push({name:"Indian rupee",value:"INR"});
          currency.push({name:"Canadian dollar",value:"CAD"});
          currency.push({name:"Swiss franc",value:"CHF"});
         
          
          return currency;
  }
   
  // END COMMON METHODS

}
