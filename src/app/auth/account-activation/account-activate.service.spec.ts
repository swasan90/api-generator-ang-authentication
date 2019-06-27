import { ResponseMessage } from './../../models/response-message';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AccountActivateService } from './account-activate.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from 'environments/environment';

fdescribe('AccountActivateService', () => {
  let accountActivateService: AccountActivateService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    accountActivateService = new AccountActivateService(httpClient);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AccountActivateService
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    accountActivateService = TestBed.get(AccountActivateService);

  });

  /**
   * Function to test activate user method
   */
  it('#activate user should activate the user', () => {
    //Initializing variables and objects for testing
    let responseMessage: ResponseMessage = { "status": true, "message": "Your account has been activated.Please login with your credentials" };
    let tokenStr = "f8ed96fb26374af4bf701fed3c3f58f9";
    let response: any = {};

    //Calling activate user method on account activate service
    accountActivateService.activateUser(tokenStr).subscribe(data => {
      response = data;
      expect(response.message).toEqual(responseMessage.message);
      expect(response.status).toBe(responseMessage.status);
    }, fail);

    //mocking http call
    const req = httpTestingController.expectOne({ url: environment.api_url + "activate?token=f8ed96fb26374af4bf701fed3c3f58f9" })
      .flush(responseMessage);

    //Verifying if there is no pending requeste open.
    httpTestingController.verify();

  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('#activate user should return error when there is no token or invalid token', () => {
    //error response
    const data = "Invalid token";

    let tokenStr = "";

    //Calling activate user method on account activate service
    accountActivateService.activateUser(tokenStr).subscribe(data =>
      fail('Invalid token.Cannot activate'),
      (err: HttpErrorResponse) => {
        expect(err.error).toEqual(data);
        expect(err.status).toEqual(401);
        expect(err.statusText).toEqual("Unauthorized");
      });



    //mocking http call
    const req = httpTestingController.expectOne({ url: environment.api_url + "activate?token=" })
      .flush(data, { status: 401, statusText: 'Unauthorized' });;

    //Verifying if there is no pending requeste open.
    httpTestingController.verify();

  });

  afterEach(() => {
    httpTestingController.verify();
  });

});
