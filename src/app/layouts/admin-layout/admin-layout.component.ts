import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import 'rxjs/add/operator/filter';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
//import PerfectScrollbar from 'perfect-scrollbar';
import {AppService} from '../../app.service';
import { SafeStyle } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';




@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  private _router: Subscription;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  otherBGColor="#fff";
  formDashboardBGColor="#3f51b5";
  bgStyletmp="background:@BG@;";
  bgStyle="background:@BG@;";

  constructor( public location: Location, private router: Router, private app: AppService,private _sanitizer: DomSanitizer) {}

  ngOnInit() {
      const isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;
      //console.log('Inside admin layout compoment ts');
    //  console.log(this.router.url)
     
      this.changeStyle();
      if (!localStorage.getItem('token')) { 
          
          console.log('Inside admin layout compoment ts--> redirecting to login');
          console.log('Inside admin layout compoment ts--> redirecting to login');
          if(!this.isMaps("resetpassword") && !this.isMaps("form"))
            this.router.navigateByUrl('/login');
       }
      if (isWindows && !document.getElementsByTagName('body')[0].classList.contains('sidebar-mini')) {
          // if we are on windows OS we activate the perfectScrollbar function

//          document.getElementsByTagName('body')[0].classList.add('perfect-scrollbar-on');
      } else {
//          document.getElementsByTagName('body')[0].classList.remove('perfect-scrollbar-off');
      }
      const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
      const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

      this.location.subscribe((ev: PopStateEvent) => {
          this.lastPoppedUrl = ev.url;
      });
       this.router.events.subscribe((event: any) => {
          if (event instanceof NavigationStart) {
             if (event.url !== this.lastPoppedUrl) {
                 this.yScrollStack.push(window.scrollY);
             }
         } else if (event instanceof NavigationEnd) {
             if (event.url === this.lastPoppedUrl) {
                 this.lastPoppedUrl = undefined;
                 window.scrollTo(0, this.yScrollStack.pop());
             } else {
                 window.scrollTo(0, 0);
             }
         }
      });
      this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
          if(elemMainPanel && elemSidebar){
              elemMainPanel.scrollTop = 0;
              elemSidebar.scrollTop = 0;    
          }
          
          
      });
      if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
          if(elemMainPanel){
//          let ps = new PerfectScrollbar(elemMainPanel);
//          ps = new PerfectScrollbar(elemSidebar);
          }
      }
  }
  changeStyle(){

        this.bgStyle=this.bgStyletmp.replace("@BG@",this.otherBGColor);

  }
  sanitizeHTML( style: string ): SafeStyle {
    return this._sanitizer.bypassSecurityTrustStyle( style );
    }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
      this.changeStyle();
      this.runOnRouteChange();
  }
  // tslint:disable-next-line:one-line
  isMaps(path){
      // tslint:disable-next-line:no-var-keyword
      var titlee = this.location.prepareExternalUrl(this.location.path());
   
      titlee = titlee.slice( 1 );
      // tslint:disable-next-line:triple-equals
      if (titlee.includes(path)) {
          return true;
      } else {
          return false;
      }
  }
   
  // tslint:disable-next-line:one-line
  
  runOnRouteChange(): void {
    this.changeStyle();
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
//      const ps = new PerfectScrollbar(elemMainPanel);
//      ps.update();
    }
  }
  isMac(): boolean {
      let bool = false;
      if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
          bool = true;
      }
      return bool;
  }

}
