import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { LoginComponent } from '../../login/login.component';
import { LogoutComponent } from '../../logout/logout.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { UserlistComponent } from '../../userlist/userlist.component';
import { AppMaterialModules } from '../../material.module'
import { SatPopoverModule } from '@ncstate/sat-popover'; // for editable table
import { BrowserModule } from '@angular/platform-browser';
import { InlineEditComponent } from '../../inline-edit/inline-edit.component';





import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CreateuserComponent } from '../../createuser/createuser.component';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { FormListComponent } from "../../formmodule/form-list/form-list.component"
import { ResponseListComponent } from "../../formmodule/response-list/response-list.component";

import { DragDropModule } from '@angular/cdk/drag-drop';
import { GoogleChartsModule } from 'angular-google-charts';
import {NgbModule,  NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { DataGridComponent }  from '../../data-grid/data-grid.component'
import { ComponentsModule } from '../../components/components.module';
import { FormBuilderComponent } from '../../formmodule/form-builder/form-builder.component';
import { FormcomponentsModule } from '../../formmodule/Formcomponents.module';
import {  FormComponent } from '../../formmodule/form/form.component';
import {  ElementPropDialogComponent } from '../../formmodule/element-prop-dialog/element-prop-dialog.component';
import { FormViewComponent } from '../../formmodule/form-view/form-view.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {  PropertyComponent } from '../../formmodule/property/property.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { TopnavComponent   } from '../../formmodule/topnav/topnav.component';
import { PublishComponent } from '../../formmodule/publish/publish.component'
import { SettingsComponent } from '../../formmodule/settings/settings.component'
import { LiveformComponent } from '../../formmodule/liveform/liveform.component'
import { PublishLeftNavComponent } from '../../formmodule/publish-left-nav/publish-left-nav.component';
import { ThankspageComponent } from '../../formmodule/thankspage/thankspage.component'
import { FormtypeDialogComponent } from '../../formmodule/formtype-dialog/formtype-dialog.component';
import { FormhomeComponent } from '../../formmodule/formhome/formhome.component';
import { FileUploadComponent }  from '../../file-upload/file-upload.component'


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    AppMaterialModules,
    SatPopoverModule,
    MatDialogModule,
    NgbModule,
    GoogleChartsModule,
    DragDropModule,
    MatToolbarModule,
    ComponentsModule,
    FormcomponentsModule,
    MatSnackBarModule,
    ColorPickerModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),

 ],
 entryComponents: [
    ConfirmDialogComponent,
    ElementPropDialogComponent,
    FormtypeDialogComponent,
 ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    LoginComponent,
    LogoutComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    UserlistComponent,
    InlineEditComponent,
    CreateuserComponent,
    ConfirmDialogComponent,
    FormListComponent,
    DataGridComponent,
    FileUploadComponent,
    ResponseListComponent,
    FormBuilderComponent,
    FormComponent,
    ElementPropDialogComponent,
    PropertyComponent,
    FormViewComponent,
    TopnavComponent,
    PublishComponent,
    SettingsComponent,
    PublishLeftNavComponent,
    LiveformComponent,
    ThankspageComponent,
    FormtypeDialogComponent,
    FormhomeComponent,
    
  
   


    // tslint:disable-next-line:no-trailing-whitespace
    
  ]
})

export class AdminLayoutModule {}
