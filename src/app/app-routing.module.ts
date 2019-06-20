import { NgModule } from '@angular/core';
import {Routes,RouterModule } from '@angular/router';

//Importing components
import { SimpleLayoutComponent } from './layouts/simple-layout/simple-layout.component';
import {LoginComponent } from './auth/login/login.component';
 

export const routes:Routes =[

    {
        path:'',
        component:SimpleLayoutComponent,
        data:{
            title:'Auth'
        },
        children:[
            {
                path:'auth/login',
                component:LoginComponent
            }
        ]
    }


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{ }


