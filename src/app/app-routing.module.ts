import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { NgModule } from '@angular/core';
import {Routes,RouterModule } from '@angular/router';

//Importing components
import { SimpleLayoutComponent } from './layouts/simple-layout/simple-layout.component';
import {LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AccountActivationComponent } from './auth/account-activation/account-activation.component';
 

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
        path:'activate',
        component:SimpleLayoutComponent,
        children:[
            {
                path:'',
                component:AccountActivationComponent
            }
        ]
    }
    



];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{ }


