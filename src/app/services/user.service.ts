import { Injectable, SystemJsNgModuleLoader  } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {User} from '../model/User';
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authService: SocialAuthService,private http: HttpClient, private router: Router) { }
  // tslint:disable-next-line:member-ordering
  private  user: User;
   getAllUsers(): Observable<User[]> {
          return this.http.get<User[]>('api/user');
    }
    getUserByEmail(email): Observable<User[]> {
      return this.http.get<User[]>('api/user?email='+email);
    }
    
    getUser(id): Observable<User> {
        console.log('In service got id = ' + id);
       // tslint:disable-next-line:no-trailing-whitespace
       return this.http.get<User>('/api/user/' + id); 

    }
    updateUser(user: User,imageToUpload: File)   {

        const formData: FormData = new FormData();
        const  jsonUser = JSON.stringify(user);
       if(imageToUpload)
        formData.append('userProfile', imageToUpload)
        console.log("BBBBBBBBBBBBBB------image",imageToUpload);
        formData.append('user', jsonUser);
        this.http.put('/api/user/' + user.id, formData).subscribe( data => console.log('User Saved successfully'),
        _error => console.log('Cant save user'));
    }
    signUpByGoogle(token) : Observable<any>{
      return this.http.post("/api/google/signInByGoogle",token);
    }
     createUser(user: User, imageToUpload: File)   {
       const formData: FormData = new FormData();
       const  newObj = JSON.stringify(user);
       if(imageToUpload)
        formData.append('userProfile', imageToUpload)
        formData.append('user', newObj);
        console.log("creating user with ",formData);
        this.http.post('/api/user', formData)
        .subscribe( 
            data => console.log('User created successfully'),
             _error => console.log('Cant create user' + _error));
    }
    registerUser(user: User, imageToUpload: File): Observable<any>   {
      const formData: FormData = new FormData();
      const  newObj = JSON.stringify(user);
      if(imageToUpload)
       formData.append('userProfile', imageToUpload)
       formData.append('user', newObj);
       console.log("creating user with ",formData);
       return this.http.post('/api/register', formData);
       
   }
   forgotPassword(email: string) : Observable<any>{
     return this.http.get('/api/resetpassword?email='+email);
     
   }
   
   byGoogleOld():Observable<any>{
     let googleAuthURL="https://accounts.google.com/o/oauth2/v2/auth?";
     //let googleAuthURL="/o/oauth2/v2/auth?";

     let clientId="client_id=66705268671-j3g7ff5d8gl6kodp8th404lfsocf86pr.apps.googleusercontent.com";
     let respType="response_type=code";
     let scope="scope=openid email"
     let rediURI="redirect_uri=http://local.form.com:8080/code";

     //make call to google for consent of user and generate code at redirect url
     let getCodeURL=googleAuthURL+clientId+"&"+respType+"&"+scope+"&"+rediURI
     let headers = new HttpHeaders();
      /* headers.append("origin", "https://localhost:4200");
       headers.append("X-Requested-With", "https://localhost:4200");
      headers.append("Access-Control-Allow-Origin", "https://localhost:4200");
        headers.append('withCredentials', 'true');*/
       
     return this.http.get(getCodeURL,{headers});

   }
   updatePassword(token: string,password:string) : Observable<any>{
    let body={token:token,plainPassword:password}
    return this.http.post('/api/updatepassword',body);
    
  }
    // tslint:disable-next-line:member-ordering
    deleteUser(id: String): any {
        // tslint:disable-next-line:no-unused-expression
        this.http.delete('/api/user/' + id).subscribe( _data => { return true; },
        _error => {return false; });
    }
    //below is the code for logout for social signout service need to be used in app service
    async signOut() {
      await this.authService.signOut();
      
    }

}
