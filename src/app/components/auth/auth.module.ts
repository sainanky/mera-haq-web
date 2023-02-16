import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([  
      {   
        path: '',   
        component: LoginComponent,  
        children: [  
          { path: 'login', component: LoginComponent},  
         ]  
      }  
  ]),
],  

exports : [
  LoginComponent,
  RouterModule
],
})
export class AuthModule { }
