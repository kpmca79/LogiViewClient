import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  token='';
  mode="reset";
  password="";
  password2="";
  titlemsg="UPDATE PASSWORD"
  passwordUpdtSuccessMsg="Your password updated successfully. You can now login to your MakeMyForm account with the new password."
  constructor(private srv: UserService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get("token");
    //http://localhost:4200/resetpassword/XQBxHcLVyQVl
    this.mode="reset"
    let exp=this.token.split("EXPT")[1];
    let expirtyTime = Number(exp);
    console.log("Expiration time",exp);
    console.log("Curretnt time",Date.now());
    if(expirtyTime<Date.now())
    {
      this.mode="expired";
      return;
    }
    
    

  }
  loginPage(){
    
  }
  resetPassword(){
    console.log("Reset Password password",this.password);
    console.log("Reset Password password",this.password2);
    if(this.password!=this.password2)
      return;
    else if(this.password.length<8)
      return;
    this.srv.updatePassword(this.token,this.password).subscribe(data=>{
      this.mode="message";
    },error=>{
     console.log("Update password failed error =",error)
    })


  }

}
