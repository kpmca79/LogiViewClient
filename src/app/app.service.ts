import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';



@Injectable({
  providedIn: 'root'
})
export class AppService {
   authenticated = false;
    users: any = [];
   publicURLs=['/form/','/thanks','/formdev'];
 constructor(private usrSrv: UserService, private http: HttpClient, private router: Router) { }
 
 authenticate3( credentials, callback ): Observable<any>{
     let userdetails={username:credentials.username,password:credentials.password};
     return this.http.post('/api/authenticate', userdetails);
}

  async authenticate(credentials): Promise<any> {
  //  console.log("inside 1")
    localStorage.setItem("auth", "true");
    let userdetails = { username: credentials.username, password: credentials.password };
    let promise = new Promise((resolve) => {
      this.http.post('/api/authenticate', userdetails).subscribe(
        response => {

          if (response['token']) {
            let jwtToken = response['token'];
            let email = response['email'];
            this.authenticated = true;
            console.log("email=", email);
            localStorage.setItem("token", jwtToken);
            localStorage.setItem("email", email);
            resolve('');
            console.log("inside 2")
          } else {
            localStorage.clear();
            this.authenticated = false;
            console.log("Authentication failed token not found in response", response);
            console.log("inside 3")
            resolve('');
          }
        },
        error => {
          this.authenticated = false;
          localStorage.clear();
          console.log("inside 4")
          console.log("Authentication failed", error);
          resolve('');

        });
    });
    return promise;

  }
authenticateold( credentials, callback ) {
    
  //console.log("Inside appservice-->authenticate");
 // console.log("Inside appservice-->localStorage.setItem(auth)",localStorage.getItem("auth"));
   localStorage.setItem("auth","true");
   const headers = new HttpHeaders(credentials ?  {authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)} : {});
this.http.get('/api/authenticate', {headers: headers}).subscribe(
  response => {
  //  console.log("Inside app response=",response);
  //  console.log("tokenddd====",response['token']);
  //  console.log("tokenddd====",response['email']);
    if (response['token']) {
      let jwtToken = response['token'];
      let email = response['email'];
      this.authenticated = true;
      localStorage.setItem("token",jwtToken);
      console.log("email===",email);
      localStorage.setItem("email",email);


    } else {
      this.authenticated = false;
    }
     return callback && callback();
  });
}
 isAuthenticated(router1: Router) : boolean
 {
      
   //  console.log("Inside appservice-->isAuthenticated");
   //  console.log("Inside appservice-->localStorage.setItem(auth)",localStorage.getItem("auth"));
     if(localStorage.getItem("auth")==='true')
         return true;
     if(localStorage.getItem("auth")&&localStorage.getItem("auth")=='true')
     {
         this.authenticated=true;
         return true;
     }
     
     const currentURL=router1.url;
     let isPublicURL=false;
  //   console.log("Inside appservice-->currentURL=",currentURL);
   //  console.log("AppService->this.authenticated ",this.authenticated);
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
    
     this.authenticated = false;
     localStorage.clear();
     this.usrSrv.signOut();
     //this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
     //this.authService.signOut();
     //this.http.get('/api/logout', {}).subscribe();
     this.router.navigateByUrl('/login');
     
 }
 getAllUsers(): any {
    // tslint:disable-next-line:no-unused-expression

        return this.http.get('api/user');
    }
 


 }


