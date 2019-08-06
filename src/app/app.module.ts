import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


//Routing Module
import { AppRoutingModule } from './app-routing.module';
//Importing components
import { SimpleLayoutComponent } from './layouts/simple-layout/simple-layout.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { AccountActivationComponent } from './auth/account-activation/account-activation.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { AppComponent } from './app.component';

import { JwtInterceptor } from './auth/jwt-interceptor';
import { ErrorInterceptor } from './errorHandlers/error.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { LogOutComponent } from './auth/logout.component';
 

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    SimpleLayoutComponent,
    FullLayoutComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    AccountActivationComponent,
    ResetPasswordComponent,
    UserprofileComponent,
    LogOutComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['http://localhost:8081/',"http://localhost:4210/"],
      }
    })
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
