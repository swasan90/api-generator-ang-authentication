import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/models/user';
import { Observable } from 'rxjs';
/**
 * @author Swathy Santhoshkumar
 */
import { ResponseMessage } from 'app/models/response-message';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})

/**
 * Class to implement forgot password service methods.
 */
export class ForgotPasswordService {

  constructor(private httpClient:HttpClient) { }

  public sendEmail(user:User):Observable<ResponseMessage>{
    return this.httpClient.post<any>(environment.api_url+"forgotPassword",user);
  }
}
