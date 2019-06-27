import { ResponseMessage } from './../../models/response-message';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ForgotPasswordService } from './forgot-password.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from 'environments/environment';
import { User } from 'app/models/user';

describe('ForgotPasswordService', () => {
  let forgotPasswordService: ForgotPasswordService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {

    forgotPasswordService = new ForgotPasswordService(httpClient);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ForgotPasswordService
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    forgotPasswordService = TestBed.get(ForgotPasswordService);

  });
  /**
   * Function to test send email.
   */
  it('#send email function should return success response after sending email to the user', () => {

    let responseMessage: ResponseMessage = { "status": true, "message": "Email has been sent to your given email id for resetting password" };

    let response: any = {};

    let requestPayload: User = new User();
    requestPayload.email = "jim.carrey@example.com";

    forgotPasswordService.sendEmail(requestPayload).subscribe(data => {
      response = data;
      expect(response.status).toEqual(responseMessage.status);
      expect(response.message).toEqual(responseMessage.message);
    });

    const req = httpTestingController.expectOne(environment.api_url + "forgotPassword").flush(responseMessage);

    //Verifying if there is no pending requeste open.
    httpTestingController.verify();

  });

  /**
   * Function to test send email returns error.
   */
  it('#send email function should return error', () => {

    const data = "Email id does not exist (or) you may have not activated your account";

    let requestPayload: User = new User();
    requestPayload.email = "jim.carrey@example.com";

    forgotPasswordService.sendEmail(requestPayload).subscribe(data =>
      fail('Email id doesnt exists'),
      (error: HttpErrorResponse) => {
        expect(error.error).toEqual(data);
        expect(error.status).toEqual(401);
        expect(error.statusText).toEqual("Unauthorized");
      }
    );

    const req = httpTestingController.expectOne(environment.api_url + "forgotPassword").flush(data, { status: 401, statusText: "Unauthorized" });

    //Verifying if there is no pending requeste open.
    httpTestingController.verify();

  });
  afterEach(() => {
    httpTestingController.verify();
  });

});
