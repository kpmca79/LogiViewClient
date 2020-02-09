import { Component, OnInit } from '@angular/core';
import { AppService } from '.././app.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor( private app: AppService) { }

  ngOnInit() {
      this.app.logout();

  }

}
