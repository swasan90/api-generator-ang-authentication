import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from 'app/models/user';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { map, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject:BehaviorSubject<User>;
  public currentUser:Observable<User>;


  constructor(private httpClient:HttpClient,private router:Router,private jwtHelper:JwtHelperService) { 
    this.currentUserSubject = new BehaviorSubject<User>(this.getUser());
    this.currentUser = this.currentUserSubject.asObservable();

  }


  getUser(){
    if(localStorage.getItem("currentUser")){
      return JSON.parse(localStorage.getItem("currentUser"));      
    }
    return null;
  }

  public get currentUserValue():User{
    return this.currentUserSubject.value;
  }

  login(requestPayload:any){
    return this.httpClient.post<any>(environment.api_url+"login",requestPayload,{observe: 'response'}).pipe(map(resp=>{          
        let token = resp.headers.get('Authorization').substring(7);  
        if(token !=null){
          localStorage.setItem('token',JSON.stringify(token));
          localStorage.setItem('currentUser',JSON.stringify(this.jwtHelper.decodeToken(token)));          
          this.currentUserSubject.next(this.getUser());               
        }        
        return this.getUser();
    }),catchError(error=>{
      return throwError(error);
    }));
  }


logout(){
   localStorage.removeItem("token");
   localStorage.removeItem("currentUser");
   this.currentUserSubject.next(null);
   this.router.navigate(['']);
 }

 public get loggedIn(): boolean{
  return localStorage.getItem('token') !=  null;
}

 

}
