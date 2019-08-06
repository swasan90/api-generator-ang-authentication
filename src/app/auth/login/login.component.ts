import { LoginService } from './login.service';
/// <reference types="crypto-js" />
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'app/models/user';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { environment } from 'environments/environment';

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


  constructor(private router: Router, private authService: AuthService,private loginService:LoginService) { }

  /**
  * Function to authenticate user
  * @param loginRequestForm 
  */
  authenticate(loginRequestForm: NgForm) {
    this.isError = false;
    this.authService.login(this.user).subscribe(currentUser => {       
      let encrypted_uuid = CryptoJS.AES.encrypt(currentUser.uuid, environment.secret_key_uuid).toString();  
      localStorage.setItem("encrypted_uuid",encrypted_uuid);
     // console.log( CryptoJS.AES.decrypt(decodeURIComponent(encrypted_uuid), environment.secret_key_uuid).toString(CryptoJS.enc.Utf8));   
      const externalRedirect = environment.api_client_url+"api/dashboard/"+encodeURIComponent(encrypted_uuid);
      window.location.href= externalRedirect;
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
