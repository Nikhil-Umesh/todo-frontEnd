import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { BasicAuthenticationService } from './../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor {


  constructor(
    private basicAuthenticationService: BasicAuthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let basicAuthHeaderString = this.basicAuthenticationService.getAuthenticatedToken();
    let userName = this.basicAuthenticationService.getAuthenticatedUser();

    if(basicAuthHeaderString && userName){
    request = request.clone({
      setHeaders: {
        Authorization: basicAuthHeaderString
      }
    })
  }

    return next.handle(request);

  }
}
