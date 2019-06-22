/**
 * @author Swathy Santhoshkumar
 */
import { AuthService } from './../auth/auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()

/**
 * Class to implement interceptor for handling error request on failure authentication.
 */
export class ErrorInterceptor implements HttpInterceptor {
  error: string;
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      let error = "";
      if (err.status == 401) {
        this.authService.logout();
        location.reload(true);
      } else if (err.status == 403) {
        error = "Invalid credentials.Please provide valid credentials";
      } else {
        if (err.error["errors"]) {          
          let errorObj = err.error["errors"];
          for (let obj of errorObj) {
            error += obj.defaultMessage + " \n";
          }
        } else {
          error = err.error.message;
        }
      }     
      return throwError(error);
    }));
  }


}
