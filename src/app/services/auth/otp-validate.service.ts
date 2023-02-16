import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ValidateService {
  configUrl = "https://api.merahaq.techymojo.in/user/check-admin-otp";
  constructor(private http: HttpClient) { }

  validateOTP(parms:any) {
    return this.http.post<any>(this.configUrl,parms);
  }
}