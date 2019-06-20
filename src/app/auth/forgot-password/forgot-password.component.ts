import { Component, OnInit } from '@angular/core';
import { User } from 'app/models/user';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor() { }

  user:User;

  ngOnInit() {
    this.user = new User();
  }

}
