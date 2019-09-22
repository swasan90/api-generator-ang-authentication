/**
 * @author Swathy Santhoshkumar
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'app/models/user';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { ResponseMessage } from 'app/models/response-message';

@Injectable({
  providedIn: 'root'
})

/**
 * Class to implement register service methods.
 */
export class RegisterService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Function to implement register user method.
   * @param userObj 
   */
  public registerUser(userObj: User): Observable<ResponseMessage> {
    console.log(environment.api_url);
    return this.httpClient.post<ResponseMessage>(environment.api_url + "register", userObj);
  }
}
