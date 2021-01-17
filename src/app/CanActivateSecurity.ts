import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppService } from './app.service';
import { Location } from '@angular/common';


@Injectable()
export class CanActivateSecurity implements CanActivate {

    authenticated=false;
    constructor( public location: Location, private app: AppService, private router: Router ) { 
        //console.log("VVVVVVVVVVV---->CanActivateSecurity constroctor called")
    }

        canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
        let path = this.location.prepareExternalUrl( this.location.path() );
        let action = path.slice( 1 );
        //console.log( 'CanActivateSecurity token=' + localStorage.getItem("token"));
        //console.log("Action is---->",action);

        if(localStorage.getItem("token"))
        {
          //  console.log( 'CanActivateSecurity token found')
           // console.log( 'token=',localStorage.getItem("token"));
            return true;
        }   
        if(action && (action.includes("resetpassword")||action.includes("form"))) 
            return true;
        if(!localStorage.getItem("token") && action)
        {
            //console.log("CanActivateSecurity else part redirecting to login");
            this.router.navigate( ['/login']);
            return true;

        }
    //    console.log("CanActivateSecurity after actiona and token check part");
        return true;
//        return true;
    }

}
