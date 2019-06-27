import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthGuard } from './auth-guard';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { TestBed } from '@angular/core/testing';
import { User } from 'app/models/user';
import { of } from 'rxjs';

describe('AuthGuard', () => {
  let authGuard:AuthGuard;
  let routerSpy: jasmine.SpyObj<Router>;
  let authSpy:jasmine.SpyObj<AuthService>;
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;
  let httpClient:HttpClient;
  let router:Router;

  beforeEach(()=>{ 
    // Creating spy objects    
    const routeSpy = jasmine.createSpyObj('Router', ['navigate']);
    const authenticationSpy = jasmine.createSpyObj('AuthService', ['currentUserValue','getUser']);            
    authGuard = new AuthGuard(routeSpy, authenticationSpy);

    var store = {};    

    //Mocking local storage on get item.
    spyOn(localStorage, 'getItem').and.callFake((key: string): string => {
      return store[key] || null;
    });

    //Mocking local storage on set item.
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): string => {
      return store[key] = <string>value;
    });  
    
     //Configuring test bed
     TestBed.configureTestingModule({       
      providers: [
        AuthGuard,
        { provide: Router, useValue: routeSpy },
        { provide: AuthService, useValue: authenticationSpy }
      ]
    });
    routerSpy = TestBed.get(Router);
    authSpy = TestBed.get(AuthService);
    authGuard = TestBed.get(AuthGuard);
  });

  /**
   * Function to test can activate method which returns true if the behavior subject has value
   */
  it('#canActivate returns boolean true if there is user', () => {

    //Creating stub user
    const user = new User();
    user.firstName = "Jim";
    user.lastName = "Carrey";
    user.email = "jim.carrey@example.com"; 

    const stubUser = new BehaviorSubject<User>(user);
    
    authSpy.currentUserSubject = stubUser; 
    expect(authSpy.currentUserSubject.getValue()).toEqual(user);     
    expect(authGuard.canActivate(route,state)).toEqual(true);
  });

  
  /**
   * Function to test can activate method which returns false if the behavior subject don't have value
   */
  it('#canActivate returns boolean true if there is user', () => {
    
    authSpy.currentUserSubject = null; 
    expect(authSpy.currentUserSubject).toEqual(null);     
    expect(authGuard.canActivate(route,state)).toEqual(false);
  });
});
