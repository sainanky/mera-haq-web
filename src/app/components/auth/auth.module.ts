import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SendOtpService } from 'src/app/services/auth/send-otp.service';
import { ValidateService } from 'src/app/services/auth/otp-validate.service';
@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,                               // <========== Add this line!
    ReactiveFormsModule,
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
providers:[SendOtpService, ValidateService],
exports : [
  LoginComponent,
  RouterModule
],
})
export class AuthModule { }
