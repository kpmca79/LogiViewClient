import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { InboxNavbarComponent } from './inbox-navbar/inbox-navbar.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {suppressScrollX: true};

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PerfectScrollbarModule,
  ],
  
  providers:[  {provide: PERFECT_SCROLLBAR_CONFIG,useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG},
             ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    InboxNavbarComponent,
   
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    InboxNavbarComponent
   
  ]
})
export class ComponentsModule { }
