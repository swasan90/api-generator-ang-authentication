/**
 * @author Swathy Santhoshkumar
 */
import { Component, OnInit } from '@angular/core';
import { User } from 'app/models/user';
import { ForgotPasswordService } from './forgot-password.service';
import { NgForm } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers: [ForgotPasswordService]
})

/**
 * Class to implement forgot password component methods
 */
export class ForgotPasswordComponent implements OnInit {

  constructor(private forgotPasswordService:ForgotPasswordService,private router:Router) { }

  user:User;
  message:string;
  isError:boolean;
  error:string;

  /**
   * Function to trigger email to the user when user forgots password.
   * @param forgotPasswordRequestForm 
   */
  forgotPassword(forgotPasswordRequestForm:NgForm){
    let userObj:any ={};
    userObj.email = this.user.email;
    this.forgotPasswordService.sendEmail(userObj).subscribe(data=>{
      this.message = data.message;
      console.log(this.message);
      const navigationExtras:NavigationExtras ={
        state:{
          message:this.message
        }
      };
      this.router.navigate(['/auth/login'],navigationExtras);
    },error=>{
       this.isError = true;       
       this.error = error;
       forgotPasswordRequestForm.reset();
    });
  }

  /**
   * Initiazling user object on loading this component.
   */
  ngOnInit() {
    this.user = new User();
  }

}
