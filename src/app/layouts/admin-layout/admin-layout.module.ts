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
import { RecaptchaModule } from 'ng-recaptcha';

import { CreateuserComponent } from '../../createuser/createuser.component';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { FormListComponent } from "../../formmodule/form-list/form-list.component"
import { MyformsListComponent } from "../../formmodule/myforms/myforms.component"
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
import { FileUploadComponent }  from '../../file-upload/file-upload.component';
import {  IconselectorComponent }  from '../../iconselector/iconselector.component';
import {  MyDialogComponent }  from '../../iconselector/iconselector.component';
import { ImageSelectionDialogComponent } from '../../formmodule/image-selection-dialog/image-selection-dialog.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormpropertyComponent } from '../../formmodule/properties/form/formproperty/formproperty.component';

import { FormtitleComponent } from '../../formmodule/properties/form/formtitle/formtitle.component';
import { TextboxComponent } from '../../formmodule/properties/form/textbox/textbox.component';
import { FullnameComponent } from '../../formmodule/properties/form/fullname/fullname.component';
import { EmailComponent } from '../../formmodule/properties/form/email/email.component';
import { AddressComponent } from '../../formmodule/properties/form/address/address.component';
import { PhonenumberComponent } from '../../formmodule/properties/form/phonenumber/phonenumber.component';
import { YesNoToggle } from '../../formmodule/properties/form/yes-no-toggle/yes-no-toggle.component';
import {DatepickerComponent } from '../../formmodule/properties/form/datepicker/datepicker.component';
import {UploadComponent } from '../../formmodule/properties/form/upload/upload.component';
import {SectionComponent } from '../../formmodule/properties/form/section/section.component';
import {RattingComponent } from '../../formmodule/properties/form/ratting/ratting.component';
import {DropdownComponent } from '../../formmodule/properties/form/dropdown/dropdown.component';
import {ButtonComponent } from '../../formmodule/properties/form/button/button.component';
import {SignatureComponent } from '../../formmodule/properties/form/signature/signature.component';
import {SignaturepadComponent } from '../../formmodule/signaturepad/signaturepad.component';
import {SurveytableComponent } from '../../formmodule/surveytable/surveytable.component';
import {SurveyComponent } from '../../formmodule/properties/form/survey/survey.component';
import { NgxNumberSpinnerModule } from 'ngx-number-spinner';
import {NumberspinnerComponent} from '../../formmodule/properties/form/numberspinner/numberspinner.component';
import {CaptchaComponent} from '../../formmodule/properties/form/captcha/captcha.component';
import {FormdevComponent} from '../../formmodule/formdev/formdev.component';
import {ProductlistComponent} from '../../formmodule/productlist/productlist.component';
import {ProductlistpropertiesComponent} from '../../formmodule/properties/form/productlistproperties/productlistproperties.component';
import { FormInboxComponent } from "../../formmodule/form-inbox/form-inbox.component"
import {CommentTreeComponent} from "../../comment-tree/comment-tree.component"
import {DateAgoPipe} from "../../pipe/date-ago.pipe";
import {Ng2TelInputModule} from 'ng2-tel-input';
import { ResetComponent } from 'app/reset/reset.component';
import { TrashFormsComponent } from 'app/formmodule/trashforms/trashforms.component';
import { DataChartComponent }  from '../../data-chart/data-chart.component';
import { FormdashboardComponent } from 'app/formmodule/formdashboar/formdashboard.component';
import {CalendarModule} from 'primeng/calendar';

import {ChartModule} from 'primeng/chart';
import { SkeletonModule } from "primeng/skeleton";

import { CountriesMapModule } from 'countries-map';
import { AnalyticsComponent } from '../../formmodule/analytics/analytics.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {suppressScrollX: true};


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
    PerfectScrollbarModule,
    NgxNumberSpinnerModule,
    RecaptchaModule,
    InfiniteScrollModule,
    Ng2TelInputModule,

    ChartModule,
    SkeletonModule,    

    CalendarModule,
    CountriesMapModule,
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
    MyDialogComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    UserlistComponent,
    InlineEditComponent,
    CreateuserComponent,
    ConfirmDialogComponent,
    FormListComponent,
    MyformsListComponent,
    DataGridComponent,
    IconselectorComponent,
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
    ImageSelectionDialogComponent,
    FormpropertyComponent,
    FormtitleComponent,
    TextboxComponent,
    FullnameComponent,
    EmailComponent,
    AddressComponent,
    PhonenumberComponent,
    YesNoToggle,
    DatepickerComponent,
    UploadComponent,
    SectionComponent,
    RattingComponent,
    DropdownComponent,
    ButtonComponent,
    SignaturepadComponent,
    SignatureComponent,
    SurveytableComponent,
    SurveyComponent,
    NumberspinnerComponent,
    FormdevComponent,
    CaptchaComponent,
    ProductlistComponent,
    ProductlistpropertiesComponent,
    FormInboxComponent,
    CommentTreeComponent,
    DateAgoPipe,
    ResetComponent,
    TrashFormsComponent,
    DataChartComponent,
    FormdashboardComponent,
    AnalyticsComponent
    
    
    // tslint:disable-next-line:no-trailing-whitespace
    
  ],
  providers:[  {provide: PERFECT_SCROLLBAR_CONFIG,useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG},
  
             ]
})

export class AdminLayoutModule {}
