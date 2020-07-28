import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { FormcomponentsModule } from './formmodule/Formcomponents.module';
import { SatPopoverModule } from '@ncstate/sat-popover'; // for editable table
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { AppService} from './app.service';
import { HttpClientModule,  HttpHandler, HttpRequest } from '@angular/common/http';
import { CanActivateSecurity } from './CanActivateSecurity';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {  AgmCoreModule} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { XhrInterceptor } from 'app/XhrInterceptor';
import { NgHttpLoaderModule  } from 'ng-http-loader' ;
import { AppMaterialModules } from './material.module'; // for editable table
import { UserService } from './services/user.service';
import { MessagingService } from './services/messaging.service';
import { DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//getting error after upgrade to 9
//import { DragDropModule } from '@angular/cdk/drag-drop';
//import { MatInputModule } from '@angular/material/input';
//import { MatSelectModule } from '@angular/material/select';
//getting error after upgrade to 9
import { HighchartsService } from './services/highcharts.service';
import { HighchartsChartModule } from 'highcharts-angular';

//time picker
import { AmazingTimePickerModule } from 'amazing-time-picker'; 


import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/plugins/link.min.js';
import 'froala-editor/js/plugins/image.min.js';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {suppressScrollX: true};


@NgModule({
    imports: [
    ReactiveFormsModule,
    SatPopoverModule,
    AppMaterialModules,
    BrowserAnimationsModule,
    FormsModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
//    DragDropModule,
//    MatInputModule, 
//    MatSelectModule,
    FormcomponentsModule,
    AmazingTimePickerModule,
    HighchartsChartModule,
    NgbModule,
    PerfectScrollbarModule,
    
    NgHttpLoaderModule.forRoot(),
 
    
    
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    
  
    
   
  ],
  providers: [DatePipe,
              AppService, 
              UserService, 
              MessagingService,
              HighchartsService,
              CanActivateSecurity, 
              {provide: PERFECT_SCROLLBAR_CONFIG,useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG},
              { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
