import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http : HttpService) { }

  sendOtp(obj){
    return this._http.post(`/user/send-otp`, obj);
  }

  verifyOtp(obj){
    return this._http.post(`/user/check-admin-otp`, obj);
  }

  verifyToken(){
    return this._http.post('/user/token/verify', {});
  }
}
