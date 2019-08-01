import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'app/models/user';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  /**
   * @author Swathy Santhoshkumar
   */
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
/**
 * Class to implement login component methods
 */
export class LoginComponent implements OnInit {


  user: User = new User();
  message: string;
  isError: boolean;
  isForgot: boolean;
  error: string;


  constructor(private router: Router, private authService: AuthService) { }

  /**
  * Function to authenticate user
  * @param loginRequestForm 
  */
  authenticate(loginRequestForm: NgForm) {
    this.isError = false;
    this.authService.login(this.user).subscribe(currentUser => {
      console.log(currentUser);
      this.router.navigate(['/home/user_profile']);
    },
      error => {
        loginRequestForm.controls['password'].reset();
        this.isError = true;
        this.error = error;
      });
  }

  ngOnInit(): void {
    if (history.state.message) {
      this.isForgot = true;
      this.message = history.state.message;
    }

  }

}
