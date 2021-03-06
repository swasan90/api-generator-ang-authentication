import { TestBed, async, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { User } from 'app/models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { map } from 'rxjs/operators';
import { stringify } from '@angular/core/src/util';
import { BehaviorSubject } from 'rxjs';


describe('AuthService', () => {
  let authService: AuthService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;
  let user:User;
  let jwtHelperSpy: jasmine.SpyObj<JwtHelperService>;
  beforeEach(() => {
    //Creating stub user
    this.user = new User();
    this.user.firstName = "Jim";
    this.user.lastName = "Carrey";
    this.user.email = "jim.carrey@example.com";

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

    //Mocking local storage on set item.
    spyOn(localStorage, 'removeItem').and.callFake((key: string): void => {
      delete store[key];
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
    localStorage.setItem('currentUser', JSON.stringify(this.user));
    expect(authService.getUser()).toEqual(JSON.parse(localStorage.getItem("currentUser")));
  });

  /**
   * Function to test the get user method which returns the current user object from the local storage
   */
  it('#getUser should return null from local storage', () => {    
    localStorage.setItem('currentUser', null);
    expect(authService.getUser()).toEqual(JSON.parse(localStorage.getItem("currentUser")));
    expect(authService.getUser()).toBe(null);
    expect(localStorage.getItem("currentUser")).toBe(null);
  });

  it('#login should authenticate user and return the user object', () => {    
    //Creating request payload object     
    let requestObj: any = {};
    requestObj.email = this.user.email;
    requestObj.password = "password";


    //Creating token and stubbing jwt helper to return stubbed object.
    let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    jwtHelperSpy.decodeToken.and.returnValue(this.user);

    //Calling AuthService login function to return response
    let loginResponse: User = new User();
    authService.login(requestObj).subscribe(resp => {
      loginResponse = resp;
    }, fail);

    //Mocking Http requests with httpTestingController and expects to return response with authorization headers. 
    const req = httpTestingController.expectOne({ url: "http://localhost:8080/login" }).flush(this.user, { headers: { 'Authorization': token } });

    //Asserting response.
    expect(loginResponse.firstName).toEqual(this.user.firstName);
    expect(loginResponse.lastName).toEqual(this.user.lastName);
    expect(loginResponse.email).toEqual(this.user.email);
    expect(loginResponse.status).toBeUndefined();

    //Verifying if there is no pending requeste open.
    httpTestingController.verify();
  });

  /**
   * Function to test if login method throws error when the user is unauthorized
   */
  it("#login should throws error when user is unauthorized", () => {
    //error response
    const data = "Invalid credentials";

    //Creating request payload object     
    let requestObj: any = {};

    //Creating token and stubbing jwt helper to return stubbed object.
    let token = null;

    //Calling AuthService login function to return response    
    authService.login(requestObj).subscribe(
      resp => fail("Invalid credentials"),
      (error: HttpErrorResponse) => {
        expect(error.error).toEqual(data);
        expect(error.status).toEqual(401);
        expect(error.statusText).toEqual("Unauthorized");
      });

    //Mocking Http requests with httpTestingController and expects to return response with authorization headers. 
    const req = httpTestingController.expectOne({ url: "http://localhost:8080/login" }).flush(data, { status: 401, statusText: 'Unauthorized' });


    //Verifying if there is no pending requeste open.
    httpTestingController.verify();


  });

  /**
   * Function to test if the local storage variables gets removed.
   */
  it('#logout should logout the user and clears the localstorage', () => {
    //Assigning local storage variables for testing to be null
    localStorage.setItem("currentUser", null);
    localStorage.setItem("token", null);

    //asserting local storage variables to be null
    expect(localStorage.getItem("currentUser")).toBe(null);
    expect(localStorage.getItem("token")).toBe(null);

    //asserting local storage variables to be removed.
    expect(localStorage.removeItem("currentUser")).toBeUndefined();
    expect(localStorage.removeItem("token")).toBeUndefined();

  });

  it("#get currentUserValue should return user", () => { 

    const stubUser = new BehaviorSubject<User>(this.user);

    authService.currentUserSubject = stubUser;
    expect(authService.currentUserValue).toEqual(this.user);

  });

  afterEach(() => {
    httpTestingController.verify();
  });

});



