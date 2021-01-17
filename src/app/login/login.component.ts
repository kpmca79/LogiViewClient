import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { ValidationError } from 'ajv';
import { User } from 'app/model/User';
import { UserService } from 'app/services/user.service';
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { HttpClient } from '@angular/common/http';
import { ContentObserver } from '@angular/cdk/observers';
//import { resolve } from 'dns';
declare var $: any;
//Login component test one

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error = false;
  mode='login'
  user:User={firstname:'',lastname:'',email:'',mobile:'',password:'',aboutMe:'',designation:'',organisation:'',id:'',profilePic:''}
  credentials = {username: 'keyur.holodox@gmail.com', password: 'aaaaaaaa'};
  register:any={firstname:'',lastname:'',email:'',password:'',mobile:'',password2:''}
  mobileVerifPtern = "^((\\+91-?)|0)?[0-9]{10}$";
  mobileFormControl = new FormControl( 'mobile', Validators.pattern(this.mobileVerifPtern));
  emailVal= new FormControl("email",Validators.email);
  socialUser: SocialUser;
  loggedIn: boolean;
  localToken='abc';
  constructor(private http: HttpClient,private authService: SocialAuthService,private app: AppService,private userService:UserService, private router: Router) { }
  
  byGoogle(){
    
   
    
  }

  facebookSignIn()
  {
      this.signUpByGoogle("facebook");
  }
  googleSignIn()
  {
      this.signUpByGoogle("google");
  }
   async signUpByGoogle(app:string){
      
      localStorage.clear();
      await this.setSocialUser(app);
      if(this.socialUser)
      {
        
        let idToken=this.socialUser.idToken;
        let id=this.socialUser.id
        let accesstoken=this.socialUser.authToken;
        let socialLoginObj=null;
        if(app=="google")
            socialLoginObj={application:"google",id:idToken,oauth:null}
        if(app=="facebook")
            socialLoginObj={application:"facebook",id:id,oauth:accesstoken}    
        if((app=="google" && idToken) || app=="facebook" && accesstoken )  
        {  
        this.userService.signUpByGoogle(socialLoginObj).subscribe(
            response=>{
            this.localToken=localStorage.getItem("token");
            if (response.data.token) {
              let jwtToken = response.data.token;
              let email = response.data.email;
              this.app.authenticated = true;
              localStorage.setItem("token", jwtToken);
              localStorage.setItem("email", email);
              this.localToken=localStorage.getItem("token");
              this.router.navigateByUrl('/myforms');
            }
            else
            {  
              this.showNotification( 'top', 'center', 'Opps something wrong happened, please try again later', 'f',3000);  
              return;
            }
            //     
          },
          error=>{
            console.log(error);
            this.showNotification( 'top', 'center', 'Opps something wrong happened, please try again later', 'f',3000)
            return;
          });}

      }
      else
        this.showNotification( 'top', 'center', 'Opps something wrong happened, please try again', 'f',3000);
    
      
   
   }
   setSocialUser(forApp:string):Promise<any> 
   {
    if(forApp=="facebook")
      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    else if(forApp=="google")  
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    let promise = new Promise((resolve)=>{
       this.authService.authState.subscribe((user) => {
          this.socialUser = user;
          if(user)
            resolve('');
       },error=>{resolve('');console.log(error)});
    });
    return promise;
   }
  async login() {

    console.log('before') 
    await this.app.authenticate(this.credentials);
    console.log('after') 
    this.localToken=localStorage.getItem("token");
      if(this.localToken)
        this.router.navigateByUrl('/myforms');
      else
        this.showNotification( 'top', 'center', 'Email or password is incorrect', 'f',3000)
   }

  ngOnInit() {
    this.localToken=localStorage.getItem("token");
    console.log("got token = ",this.localToken,"routing to my forms");
    if(localStorage.getItem("token"))
     {
      console.log("got token = ",this.localToken,"routing to my forms");
      this.router.navigateByUrl('/myforms');
     } 
  }
  showRegister(){
    this.mode="register";
  }
  showLogin(){
    this.mode="login";
  }
  showForgotPassword(){
   
      this.mode="forgot";
  }
  registerUser(){
   let error=false;
    if(this.register.password!==this.register.password2){
        this.register.password2="";  
        error=true;}
    if(this.register.password.length<8){
        this.register.password="";
        error=true;}
        if(error) return false; 
        this.user.firstname=this.register.firstname;
        this.user.lastname=this.register.lastname;
        this.user.email=this.register.email;
        this.user.mobile=this.register.mobile;
        this.user.password=this.register.password;
        this.userService.registerUser(this.user,null).subscribe(data=>{
          this.showNotification( 'top', 'center', 'Congratulations, you have registered successfully !!!', 's',2000 );
         console.log("User sucscribed successfully !!!!!!!!!!!!!!!!!!"); 
        },error=>{ console.log(error);
          this.showNotification( 'top', 'center', 'Oops, registration failed !!!', 'f',2000 );
        })
        setTimeout(()=>{
          this.mode="login";
          this.user={firstname:'',lastname:'',email:'',mobile:'',password:'',aboutMe:'',designation:'',organisation:'',id:'',profilePic:''}
          this.register={firstname:'',lastname:'',email:'',password:'',mobile:'',password2:''}
      },4000)
       
        
      
  }
  forgetpassword()
  {
    console.log("forgot password called");
    if(!this.emailVal.valid)
      return;
    this.userService.forgotPassword(this.register.email).subscribe(data=>{this.mode="message"},error=>{});
    setTimeout(() => {this.mode="message"},2000);
  }

  showNotification( from, align, msg, msgType,delay ) {

    const type = ['', 'info', 'success', 'warning', 'danger'];

    let color = Math.floor(( Math.random() * 4 ) + 1 );
    if ( msgType == 's' ) { color = 2; }
    if ( msgType == 'f' ) { color = 4; }

    $.notify( { icon: "notifications", message: msg }, {
        type: type[color],
        timer: 100,
        delay: delay,
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
    } );
}
//  onFileComplete(data: any) {
//      console.log(data); // We just print out data bubbled up from event emitter.
//}


}
