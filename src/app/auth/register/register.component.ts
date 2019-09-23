/**
 * @author Swathy Santhoshkumar
 */
import { Component, OnInit } from '@angular/core';
import { User } from 'app/models/user';
import { RegisterService } from './register.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService]
})
/**
 * Class to implement register component methods.
 */
export class RegisterComponent implements OnInit {

  constructor(private registerService: RegisterService,private router:Router) { }
  error: string;
  user: User;
  isError: boolean = false;
  message: String;
  isSuccess: boolean = false;
  /**
   * Function to register user which calls the register service method.
   * @param registerRequestForm 
   */
  register(registerRequestForm: NgForm) {
    let userObj: any = {};
    userObj.firstName = this.user.firstName;
    userObj.lastName = this.user.lastName;
    userObj.email = this.user.email;
    userObj.password = this.user.password;
    userObj.confirmPassword = this.user.confirmPassword;
    this.registerService.registerUser(userObj).subscribe(data => {
      this.isSuccess = true;
      this.message = data["message"];
      this.router.navigate(["/auth/login"]);
    }, err => {
      this.isError = true;
      this.error =err;  
      registerRequestForm.reset();    
    });
  }

  ngOnInit() {
    this.user = new User();
  }

}
