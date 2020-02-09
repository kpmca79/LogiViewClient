import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/userlist', title: 'User Admin',  icon: 'person', class: '' },
    { path: '/formlist', title: 'Forms',  icon: 'person', class: '' },
    { path: '/dashboard', title: 'My Dashboard',  icon: 'dashboard', class: '' },
    { path: '/formBuilder', title: 'Build Form',  icon: 'person', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon: 'person', class: '' },
//    { path: '/login', title: 'Login',  icon:'person', class: '' },

    { path: '/table-list', title: 'Table List',  icon: 'content_paste', class: '' },
    { path: '/typography', title: 'Typography',  icon: 'library_books', class: '' },
    { path: '/icons', title: 'Icons',  icon: 'bubble_chart', class: '' },
    { path: '/maps', title: 'Maps',  icon: 'location_on', class: '' },
    { path: '/notifications', title: 'Notifications',  icon: 'notifications', class: '' },
    { path: '/logout', title: 'Logout',  icon: 'person', class: '' },
    

    /*{ path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },*/
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
