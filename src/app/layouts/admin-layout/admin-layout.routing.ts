import { Routes } from '@angular/router';

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
import { CreateuserComponent } from '../../createuser/createuser.component';
import { FormListComponent } from 'app/formmodule/form-list/form-list.component';
import { ResponseListComponent } from '../../formmodule/response-list/response-list.component'
import { FormBuilderComponent } from "../../formmodule/form-builder/form-builder.component";
import { FormViewComponent } from '../../formmodule/form-view/form-view.component';
import { LiveformComponent } from '../../formmodule/liveform/liveform.component';
import { SettingsComponent } from '../../formmodule/settings/settings.component'
import { PublishComponent } from '../../formmodule/publish/publish.component';
import { ThankspageComponent } from '../../formmodule/thankspage/thankspage.component'

import { FormhomeComponent } from '../../formmodule/formhome/formhome.component'

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // tslint:disable-next-line:no-trailing-whitespace
    // }]}, 
    // {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // },
    // path: '',
    // children: [ {
    //   path: 'login',
    //   component: LoginComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'userlist',   component: UserlistComponent },
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile/:id',   component: UserProfileComponent },
    { path: 'login',   component: LoginComponent },
    { path: 'logout',   component: LogoutComponent },

    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'createuser',        component: CreateuserComponent},
    { path: 'formlist',        component: FormListComponent},
    { path: 'responseList/:id',   component: ResponseListComponent },
    { path: 'formPreview/:id', component: FormViewComponent },
    { path: 'formBuilder' ,   component: FormBuilderComponent },
    { path: 'formBuilder/:id' ,   component: FormBuilderComponent },
//    { path: 'formBuilder/:id/publish/' ,   component: PublishComponent },
    { path: 'formBuilder/:id/publish/:type' ,   component: PublishComponent },
    { path: 'formBuilder/:id/settings' ,  component: SettingsComponent },
    { path: 'form/:id' ,   component:  LiveformComponent},
    { path: 'formhome/:id' ,   component:  FormhomeComponent},
    
    { path: 'form/:id/thanks' ,   component:  ThankspageComponent},
];
