import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SendOtpService } from './services/auth/send-otp.service';
import { ValidateService } from './services/auth/otp-validate.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [SendOtpService,ValidateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
