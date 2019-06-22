import { AuthService } from './../auth/auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err=>{
      let error ="";
      if(err.status == 401){
       // this.authService.logout();
        location.reload(true);
      }else if(err.status == 403){
        error = "Invalid credentials.Please provide valid credentials";
      }           
      return throwError(error);
    }));
  }

  
}
