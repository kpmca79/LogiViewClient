import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpInterceptor} from '@angular/common/http';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
//      console.log("Inside XhrInterceptor chaging request headers !!!!")
//      console.log(req.url);
      if(req.url.match("cors-anywhere.herokuapp.com"))
      { 
//          console.log("Request url matches cors-anywhere so not changing its headers");
          return next.handle(req);
      }
      //else if (req.url.match("api/file") || req.url.match('api/authenticate'))
      //remove api/file and let allow to add jwt in header as it was causing 401
      else if (req.url.match('api/authenticate'))
      {  
//          console.log("Request url matches api/file so not changing its headers");
      return next.handle(req);
  }
  else if (req.url.match('o/oauth2/v2/auth')){
    return next.handle(req);
  }
    let token= localStorage.getItem("token");
   if(!token)
    token='';
    const xhr = req.clone(
      {headers: req.headers.set('X-Requested-With', 'XMLHttpRequest').append('Authorization','Bearer '+token), withCredentials: true });
    return next.handle(xhr);
  }

}
