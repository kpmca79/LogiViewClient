import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppService } from './app.service';
import { Location } from '@angular/common';


@Injectable()
export class CanActivateSecurity implements CanActivate {

    constructor(public location: Location, private app: AppService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//        let titlee = this.location.prepareExternalUrl(this.location.path());
//        console.log(titlee);
//        
//        titlee = titlee.slice( 1 );
//        
//       console.log('is authenticated=' + this.app.authenticated)
//     if (this.app.authenticated || titlee === '' || titlee === 'login') {
//        console.log('------------>Authenticated returning true' + titlee);
//
//        return true;
//
//      } else {
//            console.log('------------>Else part' + titlee);
//          this.router.navigate(['/login'], {queryParams: {return: state.url}});
//          return false;
//
//      }
        return true;
    }

}
