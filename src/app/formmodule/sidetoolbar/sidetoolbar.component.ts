import { Component, OnInit } from '@angular/core';
import { FormField } from '../../model/FormField';
import { FormService } from '../../services/form.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem  } from '@angular/cdk/drag-drop';
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/userlist', title: 'Text box',  icon: 'text_fields', class: '' },
    { path: '/formlist', title: 'Combo box',  icon: 'person', class: '' },
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
  selector: 'sidetoolbar',
  templateUrl: './sidetoolbar.component.html',
  styleUrls: ['./sidetoolbar.component.scss']
})
export class SidetoolbarComponent implements OnInit {
   menuItems: any[];
   formFields: FormField[] = [];
   formFields2: FormField[] = [];
   constructor(private srv:FormService) {}
   ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.srv.getFields().subscribe(data => {
          let x= data
          this.formFields = x.data;});
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
   drop(event: CdkDragDrop<string[]>) {
      if (event.previousContainer === event.container) 
      {
        //   moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      } else {
          const tempVal2:any = event.previousContainer.data[event.previousIndex]; 
          const std : FormField = new FormField();
          std.name = tempVal2.name;
          std.type = tempVal2.type;
          std.title = tempVal2.title;
          std.maxlen =tempVal2.maxlen;
          std.minlen =tempVal2.minlen;
          std.minlen =tempVal2.minlen;
          std.required =tempVal2.required;
          std.selectedOption =['option1'];
          std.frmControl=new FormControl('', []); ;
          std.validation = JSON.parse(JSON.stringify(tempVal2.validation));
          std.selOptions = JSON.parse(JSON.stringify(tempVal2.selOptions)); 
          std.innerHtml=tempVal2.innerHtml;
          std.color=tempVal2.color;
          std.selectedColor=tempVal2.selectedColor;
          std.checked=tempVal2.checked;
          std.disabled=tempVal2.disabled;
          std.mindate=tempVal2.mindate;
          std.maxdate=tempVal2.maxdate;
          std.selectedDate=tempVal2.selectedDate;
          this.formFields2.push(std);


      }
  }
}
