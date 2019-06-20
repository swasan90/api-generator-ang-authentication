import { Component, OnInit } from '@angular/core';
import { User } from 'app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  user:User;

  ngOnInit() {
    this.user = new User();
  }

}
