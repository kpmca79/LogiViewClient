import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

//Login component test one

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error = false;

  credentials = {username: 'keyur', password: 'keyur'};
  constructor(private app: AppService, private router: Router) { }
  login() {

      this.app.authenticate(this.credentials, () => {this.router.navigateByUrl('/dashboard'); } );
      this.error = !this.app.authenticated;
      return false;
  }
  ngOnInit() {
  }
//  onFileComplete(data: any) {
//      console.log(data); // We just print out data bubbled up from event emitter.
//}


}
