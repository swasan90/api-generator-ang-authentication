/**
 * @author Swathy Santhoshkumar
 */
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  template: '<p>Logging Out</p>',
})

/**
 * Class to implement logout component methods.
 */
export class LogOutComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }
  /**
   * Function to implement logout method
   */
  logout() {
    this.authService.logout();
    this.router.navigate(['auth/login']);

  }
  ngOnInit() {
    this.logout();
  }

}
