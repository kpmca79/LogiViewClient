import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { UserService } from '../services/user.service';
import { User } from '../model/User';


@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.scss']
})
export class CreateuserComponent implements OnInit {
   imageUrl: String = './assets/img/faces/marc.jpg' ;
   imageToUpload: File;
   public userdetail: User = { id: '', firstname: '', mobile:'',lastname: '', email: '', password: '', profilePic: null, aboutMe: '',
   designation: '', organisation: ''};
   constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
      
  }
 
  createProfile() {

    console.log(this.userdetail.firstname);
    if(this.imageToUpload==null)
    {
        
    }
    this.userService.createUser(this.userdetail, this.imageToUpload);
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
