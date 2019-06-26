import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { RegisterService } from './register.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { User } from 'app/models/user';
import { environment } from 'environments/environment';
import { ResponseMessage } from 'app/models/response-message';
import { Error } from 'app/models/error';
import { Errors } from 'app/models/errors';

describe('RegisterService', () => {
  let registerService: RegisterService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    registerService = new RegisterService(httpClient);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        RegisterService
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    registerService = TestBed.get(RegisterService);
  });

  /**
   * Function to test register user returns success
   */
  it('#register user method should register the user', () => {

    //Stubbing response Messgae
    let responseMessage: ResponseMessage = { "status": true, "message": "Successfully created account.Please check your email" };

    //creating variable to store response
    let response: ResponseMessage = new ResponseMessage();

    //Creating request payload
    let requestPayload: User = new User();
    requestPayload.firstName = "Swathy";
    requestPayload.lastName = "Santhosh";
    requestPayload.email = "swathy.s@example.com";
    requestPayload.password = "password";
    requestPayload.confirmPassword = "password";

    //Calling register user method on register user.
    registerService.registerUser(requestPayload).subscribe(resp => {
      response = resp;
      expect(response.status).toEqual(responseMessage.status);
      expect(response.message).toEqual(responseMessage.message);
    }, fail);

    //Mocking Http requests with httpTestingController and expects to return response with authorization headers. 
    const req = httpTestingController.expectOne(environment.api_url + "register").flush(responseMessage, { status: 200, statusText: 'Created' });


    //Verifying if there is no pending requeste open.
    httpTestingController.verify();

  });

  /**
   * Function to test register user throws error when user already exists.
   */
  it("#register user method should throw error when user already exists ", () => {
    //Stubbing response Messgae
    let responseMessage: ResponseMessage = { "status": false, "message": "Email id exist.Cannot create account" };

    //creating variable to store response
    let response: ResponseMessage = new ResponseMessage();

    //Creating request payload
    let requestPayload: User = new User();
    requestPayload.firstName = "Swathy";
    requestPayload.lastName = "Santhosh";
    requestPayload.email = "swathy.s@example.com";
    requestPayload.password = "password";
    requestPayload.confirmPassword = "password";

    //Calling register user method on register user.
    registerService.registerUser(requestPayload).subscribe(
      resp => fail('Email id already exists'),
      (error: HttpErrorResponse) => {
        console.log(error);
        expect(error.error.message).toEqual(responseMessage.message);
        expect(error.error.status).toEqual(false);
        expect(error.status).toEqual(400);
        expect(error.statusText).toEqual("Bad Request");
      });

    //Mocking Http requests with httpTestingController and expects to return response with authorization headers. 
    const req = httpTestingController.expectOne(environment.api_url + "register").flush(responseMessage, { status: 400, statusText: 'Bad Request' });


    //Verifying if there is no pending requeste open.
    httpTestingController.verify();

  });

  /**
   * Function to test register user throws error when user already exists.
   */
  it("#register user method should throw error when given invalid input ", () => {
    //Stubbing response Messgae
    let errors: Errors[] = [
      { "field": "email", "message": "Email cannot be blank" },
      { "field": "confirmPassword", "message": "Confirm Password cannot be blank" },
      { "field": "firstName", "message": "First Name cannot be blank" },
      { "field": "lastName", "message": "Last Name cannot be blank" },
      { "field": "Password", "message": "Password cannot be blank" },
    ]
    let err: Error = { "errorType": "Bad Request", errors };


    //creating variable to store response
    let response: ResponseMessage = new ResponseMessage();

    //Creating request payload
    let requestPayload: User = new User();
    requestPayload.firstName = "";
    requestPayload.lastName = "";
    requestPayload.email = "";
    requestPayload.password = "";
    requestPayload.confirmPassword = "";

    //Calling register user method on register user.
    registerService.registerUser(requestPayload).subscribe(
      resp => fail('Invalid data'),
      (error: HttpErrorResponse) => {
        expect(error.error["errors"]).toEqual(err.errors);
        expect(error.status).toEqual(400);
        expect(error.statusText).toEqual(err.errorType);
      });

    //Mocking Http requests with httpTestingController and expects to return response with authorization headers. 
    const req = httpTestingController.expectOne(environment.api_url + "register").flush(err, { status: 400, statusText: err.errorType });


    //Verifying if there is no pending requeste open.
    httpTestingController.verify();

  })



});
