import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SendOtpService } from 'src/app/services/auth/send-otp.service';
import { ValidateService } from 'src/app/services/auth/otp-validate.service';
import { CommonService } from '../../services/common.service';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,                               // <========== Add this line!
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
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
providers:[SendOtpService, ValidateService, CommonService],

})

export class AuthModule { }
