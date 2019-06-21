import { Component, OnInit } from '@angular/core';
import { User } from 'app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  user:User = new User();
  message:string;
  isError:boolean;
  isForgot:boolean;

  constructor(private router:Router) { }

  ngOnInit(): void {         
    if( history.state.message){      
        this.isForgot = true;
        this.message = history.state.message;        
    }
    
  }

}
