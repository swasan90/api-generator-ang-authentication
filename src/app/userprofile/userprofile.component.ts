import { HttpClient } from '@angular/common/http';
/**
 * @author Swathy Santhoshkumar
 */
import { Component, OnInit } from '@angular/core';
import { User } from 'app/models/user';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  user: User;
  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("currentUser"));    
  }

}
