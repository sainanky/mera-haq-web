import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ValidateService {
  configUrl = "https://api.merahaq.techymojo.in/user/check-admin-otp";
  constructor(private http: HttpClient) { }

  validateOTP() {
    return this.http.post<any>(this.configUrl,{
      "mobile":"+919560775627",
      "msg_id" : "2bcf601f-cc75-4eed-a7dd-cd1a162aa55f",
      "otp" : "915390"
  });
  }
}