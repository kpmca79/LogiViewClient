import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { UserService } from '../services/user.service';
import { User } from '../model/User';
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public user  ;
  public id;
  public userdetail: User;
  public imageUrl = './assets/img/faces/marc.jpg' ;
  public safeBgURL;
  imageToUpload: File;
  constructor(private sanitizer: DomSanitizer, private router: Router, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {

   // tslint:disable-next-line:whitespace
   this.route.params.subscribe(params => {
   this.id = params['id'];
    console.log('fetching details for user = ' + this.id);
       });

   this.userService.getUser(this.id).subscribe(
       res => {
          let resData:any = res; 
        this.userdetail = resData.data;
        if(this.userdetail.profilePic)
           this.imageUrl="/api/file/"+this.userdetail.profilePic;
        this.safeBgURL = this.sanitizer.bypassSecurityTrustStyle(this.imageUrl);
       
    }
        
        );
   

  }
  updateProfile() {

    this.userService.updateUser(this.userdetail,this.imageToUpload);
      this.router.navigateByUrl('/userlist');
  }

  showImage( files: FileList) {
    this.imageToUpload = files.item(0);
    console.log('showimagecalled' + this.imageToUpload.name);
    // tslint:disable-next-line:prefer-const
    let reader: FileReader = new FileReader();
    reader.onload = (event: any) => {
        console.log('showimagecalled' + event.target.result);
        this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.imageToUpload);
  }

}
