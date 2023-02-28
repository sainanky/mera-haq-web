import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { CommonService } from 'src/app/services/common.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WindowService } from 'src/app/services/window/window.service';

const routes : Routes = [
  {
    path : "",
    component : AuthComponent
  }
]

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers : [WindowService, HttpService, CommonService, AuthService]
})
export class AuthModule { }
