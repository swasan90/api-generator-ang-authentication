import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { ResponseMessage } from 'app/models/response-message';
import { User } from 'app/models/user';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private httpClient:HttpClient) { }

  public validateToken(token:string):Observable<ResponseMessage>{
    const params = new HttpParams().set('token',token);   
    return this.httpClient.get<any>(environment.api_url+"reset",{params});
  }

  public resetPassword(user:User):Observable<ResponseMessage>{
    return this.httpClient.post<ResponseMessage>(environment.api_url+"reset",user);
  }
}
