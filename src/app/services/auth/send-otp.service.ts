import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SendOtpService {
  configUrl = "https://api.merahaq.techymojo.in/user/send-otp";
  constructor(private http: HttpClient) { }

  sendOTP() {
    return this.http.post<any>(this.configUrl,{
        "mobile":"+919560775627"
    });
  }
}