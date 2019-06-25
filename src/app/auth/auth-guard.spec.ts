import { AuthGuard } from './auth-guard';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { TestBed } from '@angular/core/testing';

describe('AuthGuard', () => {
  let routerSpy: jasmine.SpyObj<Router>;
  let authService:jasmine.SpyObj<AuthService>;

  it('should create an instance', () => {
    authService = TestBed.get(AuthService);
    routerSpy = TestBed.get(Router);
    expect(new AuthGuard(routerSpy,authService)).toBeTruthy();
  });
});
