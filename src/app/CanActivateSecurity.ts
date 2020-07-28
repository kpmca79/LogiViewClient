import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppService } from './app.service';
import { Location } from '@angular/common';


@Injectable()
export class CanActivateSecurity implements CanActivate {

    authenticated=false;
    constructor( public location: Location, private app: AppService, private router: Router ) { 
        console.log("VVVVVVVVVVV---->CanActivateSecurity constroctor called")
    }

        canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
        let path = this.location.prepareExternalUrl( this.location.path() );
        let action = path.slice( 1 );
        console.log( 'CanActivateSecurity localStorage.getItem("auth")=' + localStorage.getItem("auth"));
        if(localStorage.getItem("auth")&&localStorage.getItem("auth")=='true')
        {
            return true;
        }    
        
        if ( this.app.authenticated || action === '' || action === 'login' ) {
            
            return true;

        } else {
        
            this.router.navigate( ['/login'], { queryParams: { return: state.url } } );
            return false;

        }
//        return true;
    }

}
