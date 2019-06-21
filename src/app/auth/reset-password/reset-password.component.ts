import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ResetPasswordService } from './reset-password.service';
import { ResponseMessage } from 'app/models/response-message';
import { Observable } from 'rxjs';
import { User } from 'app/models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers: [ResetPasswordService]
})
export class ResetPasswordComponent implements OnInit {

  tokenParam: string;
  result: Observable<ResponseMessage>;
  isValid: boolean;
  user: User;
  message: string;
  isError: boolean;
  error: string;
  constructor(private resetPasswordService: ResetPasswordService, private route: ActivatedRoute, private router: Router) { }

  resetPassword(resetPasswordRequestForm: NgForm) {
    let resetPwdObj: any = {};
    resetPwdObj.password = this.user.password;
    resetPwdObj.token = this.tokenParam;
    this.resetPasswordService.resetPassword(resetPwdObj).subscribe(data => {
      this.message = data.message;
      const navigationExtras: NavigationExtras = {
        state: {
          'message': this.message
        }
      }
      this.router.navigate(['/auth/login'], navigationExtras);
    }, error => {
      this.isError = true;
      this.error = error.error.message;
    });
  }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.tokenParam = params['token'];
    });
    this.result = this.resetPasswordService.validateToken(this.tokenParam);
    this.result.subscribe(data => {
      if (data.status) {
        this.isValid = true;
        this.user = new User();
      } else {
        this.isValid = false;
        this.message = "Your token is invalid.It may be expired or you are trying to access with wrong token.Kindly reset password with valid token.";
      }
    });

  }

}
