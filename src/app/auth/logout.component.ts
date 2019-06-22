import { Component,OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  template: '<p>Logging Out</p>',
})
export class LogOutComponent implements OnInit{
   constructor(private authService: AuthService, private router: Router) { } 
  logout() {    
    this.authService.logout();
    this.router.navigate(['auth/login']);
    
  }
  ngOnInit() {
      this.logout();
  }

}
