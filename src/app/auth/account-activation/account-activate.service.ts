import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseMessage } from 'app/models/response-message';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountActivateService {

  constructor(private httpClient:HttpClient) { }

  public activateUser(tokenStr:string):Observable<ResponseMessage>{
    const params = new HttpParams().set('token',tokenStr);   
    return this.httpClient.get<any>(environment.api_url+"activate", {params});
  }
}
