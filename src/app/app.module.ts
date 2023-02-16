import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SendOtpService } from './services/auth/send-otp.service';
import { ValidateService } from './services/auth/otp-validate.service';
import { AuthModule } from './components/auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    NgbModule
  ],
  providers: [SendOtpService, ValidateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
