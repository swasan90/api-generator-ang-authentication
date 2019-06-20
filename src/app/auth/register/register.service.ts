import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'app/models/user';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient:HttpClient) {  }

  public registerUser(userObj:User):Observable<User>{
    return this.httpClient.post<User>(environment.api_url + "register",userObj);
  }
}