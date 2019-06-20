import { Component, OnInit } from '@angular/core';
import { User } from 'app/models/user';
import { RegisterService } from './register.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[RegisterService]
})
export class RegisterComponent implements OnInit {

  constructor(private registerService:RegisterService) { }
  error:String;
  user:User;
  showError:boolean=false;
  message:String;
  isSuccess:boolean=false;

  register(registerRequestForm:NgForm){
    let userObj:any ={};
    userObj.firstName = this.user.firstName;
    userObj.lastName = this.user.lastName;
    userObj.email = this.user.email;
    userObj.password = this.user.password;
    userObj.confirmPassword = this.user.confirmPassword;
    this.registerService.registerUser(userObj).subscribe(data=>{
      this.isSuccess = true;
      this.message = data["message"];
    },error=>{
        this.showError =true;
        this.error  ="";         
        if(error.error["errors"]){
          let errorObj = error.error["errors"];
          for(let obj of errorObj){
            this.error += obj.defaultMessage+" \n";
          }
        }else{
          this.error =error.error.message;
        }
      });
  }

  ngOnInit() {
    this.user = new User();
  }

}
