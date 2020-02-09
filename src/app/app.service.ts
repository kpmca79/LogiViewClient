import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AppService {
   authenticated = false;
    users: any = [];
   publicURLs=['/form/','/thanks'];
 constructor(private http: HttpClient, private router: Router) { }
 authenticate( credentials, callback ) {
    
  const headers = new HttpHeaders(credentials ?  {authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)} : {});
  this.http.get('/api/authenticate', {headers: headers}).subscribe(
    response => {
      if (response['name']) {
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }
       return callback && callback();
    });
}
 isAuthenticated(router1: Router) : boolean
 {
     const currentURL=router1.url;
     let isPublicURL=false;
     console.log("AppService->isAuthenticated route is ",currentURL);
     this.publicURLs.forEach(value=>
     {
         console.log('value=',value)
          console.log("currentURL",currentURL);
         console.log('condition=',currentURL.includes(value))
         if(currentURL.includes(value))
             isPublicURL= true;
      });
     if(isPublicURL)
         return true;
     else
         return this.authenticated;
 }
 
 logout() {
     this.http.get('/api/logout', {}).subscribe();
     this.authenticated = false;
     this.router.navigateByUrl('/login');
 }
 getAllUsers(): any {
    // tslint:disable-next-line:no-unused-expression

        return this.http.get('api/user');
    }
 


 }


