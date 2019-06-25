import { TestBed, async, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { User } from 'app/models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { map } from 'rxjs/operators';
import { stringify } from '@angular/core/src/util';


fdescribe('AuthService', () => {
  let authService: AuthService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;
  let jwtHelperSpy: jasmine.SpyObj<JwtHelperService>;
  beforeEach(() => {
    var store = {};
    // Creating spy objects    
    const routeSpy = jasmine.createSpyObj('Router', ['navigate']);
    const jwtSpy = jasmine.createSpyObj('JwtHelperService', ['decodeToken']);
    authService = new AuthService(httpClient, routeSpy, jwtSpy);

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
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AuthService,
        { provide: Router, useValue: routeSpy },
        { provide: JwtHelperService, useValue: jwtSpy }
      ]
    });


    httpTestingController = TestBed.get(HttpTestingController);
    routerSpy = TestBed.get(Router);
    jwtHelperSpy = TestBed.get(JwtHelperService);
    authService = TestBed.get(AuthService);

  });

  /**
   * Function to test the get user method which returns the current user object from the local storage
   */
  it('#getUser should return current user from local storage', () => {
    //Creating stub user object
    const stubUser = new User();
    stubUser.firstName = "Jim";
    stubUser.lastName = "Carrey";
    stubUser.email = "jim.carrey@example.com";
    localStorage.setItem('currentUser', JSON.stringify(stubUser));
    expect(authService.getUser()).toEqual(JSON.parse(localStorage.getItem("currentUser")));
  });

  /**
   * Function to test the get user method which returns the current user object from the local storage
   */
  it('#getUser should return null from local storage', () => {
    const stubValue = new User();
    localStorage.setItem('currentUser', null);
    expect(authService.getUser()).toEqual(JSON.parse(localStorage.getItem("currentUser")));
    expect(authService.getUser()).toBe(null);
    expect(localStorage.getItem("currentUser")).toBe(null);
  });

  it('#login should authenticate user and return the user object', () => {
    //Creating stub user object
    const stubUser: User = new User();
    stubUser.firstName = "Jim";
    stubUser.lastName = "Carrey";
    stubUser.email = "jim.carrey@example.com";

    //Creating request payload object     
    let requestObj: any = {};
    requestObj.email = stubUser.email;
    requestObj.password = "password";


    //Creating token and stubbing jwt helper to return stubbed object.
    let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    jwtHelperSpy.decodeToken.and.returnValue(stubUser);

    //Calling AuthService login function to return response
    let loginResponse: User = new User();
    authService.login(requestObj).subscribe(resp => {
      loginResponse = resp;
    });

    //Mocking Http requests with httpTestingController and expects to return response with authorization headers. 
    const req = httpTestingController.expectOne({ url: "http://localhost:8080/login" }).flush(stubUser, { headers: { 'Authorization': token } });

    //Asserting response.
    expect(loginResponse.firstName).toEqual(stubUser.firstName);
    expect(loginResponse.lastName).toEqual(stubUser.lastName);
    expect(loginResponse.email).toEqual(stubUser.email);
    expect(loginResponse.status).toBeUndefined();

    //Verifying if there is no pending requeste open.
    httpTestingController.verify();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

});



