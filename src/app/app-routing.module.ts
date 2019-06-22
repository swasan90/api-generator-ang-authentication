import { UserprofileComponent } from './userprofile/userprofile.component';
import { AuthGuard } from './auth/auth-guard';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { NgModule } from '@angular/core';
import {Routes,RouterModule } from '@angular/router';

//Importing components
import { SimpleLayoutComponent } from './layouts/simple-layout/simple-layout.component';
import {LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AccountActivationComponent } from './auth/account-activation/account-activation.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { LogOutComponent } from './auth/logout.component';
 
 

export const routes:Routes =[

    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    },    
    {
        path:'auth',
        component:SimpleLayoutComponent,
        data:{
            title:'Auth'
        },
        children:[
            {
                path:'register',
                component:RegisterComponent
            },
            {
                path:'login',
                component:LoginComponent
            },
            {
                path:'forgot_password',
                component:ForgotPasswordComponent
            }
        ]
    },
    {
        path:'',
        component:SimpleLayoutComponent,
        children:[
            {
                path:'activate?token=',
                component:AccountActivationComponent
            },
            {
                path:'reset?token=',
                component:ResetPasswordComponent
            }
        ]
    },
    {
        path:'home',
        component:FullLayoutComponent,
        canActivate:[AuthGuard],
        data:{
            title:'Home',
        },
        children:[
            {
                path:'user_profile',
                component: UserprofileComponent 
            },
            {
                path:'auth/logout',
                component: LogOutComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{ }


