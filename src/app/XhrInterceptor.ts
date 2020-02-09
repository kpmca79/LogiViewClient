import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpInterceptor} from '@angular/common/http';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
      console.log("Inside XhrInterceptor chaging request headers !!!!")
      console.log(req.url);
      if(req.url.match("cors-anywhere.herokuapp.com"))
      {  console.log("Request url matches cors-anywhere so not changing its headers");
          return next.handle(req);
      }
      else if (req.url.match("api/file"))
      {  console.log("Request url matches api/file so not changing its headers");
      return next.handle(req);
  }
    const xhr = req.clone({headers: req.headers.set('X-Requested-With', 'XMLHttpRequest'), withCredentials: true });
    return next.handle(xhr);
  }

}
