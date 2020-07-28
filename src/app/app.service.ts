import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AppService {
   authenticated = false;
    users: any = [];
   publicURLs=['/form/','/thanks','/formdev'];
 constructor(private http: HttpClient, private router: Router) { console.log("VVVVVVVVVVV---->app service constroctor called")}
 
 authenticate( credentials, callback ) {
    
    console.log("Inside appservice-->authenticate");
    console.log("Inside appservice-->localStorage.setItem(auth)",localStorage.getItem("auth"));
     localStorage.setItem("auth","true");
     const headers = new HttpHeaders(credentials ?  {authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)} : {});
  this.http.get('/api/authenticate', {headers: headers}).subscribe(
    response => {
      if (response['name']) {
        this.authenticated = true;
        localStorage.setItem("auth","true");
      } else {
        this.authenticated = false;
      }
       return callback && callback();
    });
}
 isAuthenticated(router1: Router) : boolean
 {
      
     console.log("Inside appservice-->isAuthenticated");
     console.log("Inside appservice-->localStorage.setItem(auth)",localStorage.getItem("auth"));
     if(localStorage.getItem("auth")==='true')
         return true;
     if(localStorage.getItem("auth")&&localStorage.getItem("auth")=='true')
     {
         this.authenticated=true;
         return true;
     }
     
     const currentURL=router1.url;
     let isPublicURL=false;
     console.log("Inside appservice-->currentURL=",currentURL);
     console.log("AppService->this.authenticated ",this.authenticated);
     this.publicURLs.forEach(value=>
     {
//         console.log('value=',value)
//          console.log("currentURL",currentURL);
//         console.log('condition=',currentURL.includes(value))
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
     localStorage.clear();
     this.router.navigateByUrl('/login');
 }
 getAllUsers(): any {
    // tslint:disable-next-line:no-unused-expression

        return this.http.get('api/user');
    }
 


 }


