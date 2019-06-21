import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';

 //Routing Module
import {AppRoutingModule} from './app-routing.module';
import { SimpleLayoutComponent } from './layouts/simple-layout/simple-layout.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { AccountActivationComponent } from './auth/account-activation/account-activation.component'; 
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';


@NgModule({
  declarations: [
    AppComponent,
    SimpleLayoutComponent,
    FullLayoutComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    AccountActivationComponent,    
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
