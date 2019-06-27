import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ResetPasswordService } from './reset-password.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { ResponseMessage } from 'app/models/response-message';
import { environment } from 'environments/environment';
import { Error } from 'app/models/error';
import { User } from 'app/models/user';
import { Errors } from 'app/models/errors';

describe('ResetPasswordService', () => {
  let resetPasswordService: ResetPasswordService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    resetPasswordService = new ResetPasswordService(httpClient);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ResetPasswordService
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    resetPasswordService = TestBed.get(ResetPasswordService);

  });

  /**
   * Function to test validate token.
   */
  it('should validate token and returns status', () => {
    let tokenStr = "f8ed96fb26374af4bf701fed3c3f58f9";
    let responseMessage: ResponseMessage = { "status": true };

    resetPasswordService.validateToken(tokenStr).subscribe(data => {
      expect(data.status).toEqual(responseMessage.status);
    }, fail);

    const req = httpTestingController.expectOne(environment.api_url + "reset?token=f8ed96fb26374af4bf701fed3c3f58f9").flush(responseMessage, { status: 200, statusText: 'valid' });

    //Verifying if there is no pending requeste open.
    httpTestingController.verify();
  });

  /**
   * Function to test validate token returns error.
   */
  it('should validate token and returns error', () => {
    let tokenStr = "";
    let err: Error = { "status": false };
    resetPasswordService.validateToken(tokenStr).subscribe(data =>
      fail('Invalid token'),
      (error: HttpErrorResponse) => {
        expect(error.error.status).toEqual(err.status);
        expect(error.status).toEqual(401);
        expect(error.statusText).toEqual("Unauthorized");
      });

    const req = httpTestingController.expectOne(environment.api_url + "reset?token=").flush(err, { status: 401, statusText: 'Unauthorized' });

    //Verifying if there is no pending requeste open.
    httpTestingController.verify();
  });

  /**
   * Function to test reset password.
   */
  it('should reset password', () => {

    let requestPayload: User = new User();
    requestPayload.password = "password";
    requestPayload.token = "3c94c0741fb74ddd8db673723f04dff0";

    let responseMessage: ResponseMessage = { "status": true, "message": "Your password has been reset.Kindly login with your new password" };


    resetPasswordService.resetPassword(requestPayload).subscribe(data => {
      expect(data.status).toEqual(responseMessage.status);
      expect(data.message).toEqual(responseMessage.message);
    }, fail);

    const req = httpTestingController.expectOne(environment.api_url + "reset").flush(responseMessage, { status: 200, statusText: 'Success' });

    //Verifying if there is no pending requeste open.
    httpTestingController.verify();
  });

  /**
   * Function to test reset password returns error when passing invalid inputs.
   */
  it('should reset password returns error', () => {

    let requestPayload: User = new User();

    //Stubbing response Messgae
    let errors: Errors[] = [
      { "field": "Token", "message": "Token cannot be blank" },
      { "field": "Password", "message": "Password cannot be blank" },
    ]
    let err: Error = { "errorType": "Bad Request", errors };


    resetPasswordService.resetPassword(requestPayload).subscribe(data =>
      fail('Invalid inputs'),
      (error: HttpErrorResponse) => {
        expect(error.error["errors"]).toEqual(err.errors);
        expect(error.status).toEqual(400);
        expect(error.statusText).toEqual(err.errorType);
        expect(error.ok).toEqual(false);
      });

    const req = httpTestingController.expectOne(environment.api_url + "reset").flush(err, { status: 400, statusText: 'Bad Request' });

    //Verifying if there is no pending requeste open.
    httpTestingController.verify();
  });



  afterEach(() => {
    httpTestingController.verify();
  });
});
