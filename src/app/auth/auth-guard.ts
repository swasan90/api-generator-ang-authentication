/**
 * @author Swathy Santhoshkumar
 */
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authenticationService: AuthService) { }

    /**
     * Function to implement canActivate function
     * @param route 
     * @param state 
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const currentUser = !!this.authenticationService.currentUserSubject;
        if (currentUser) {
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['auth/login']);
        return false;
    }
}
