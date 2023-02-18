import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  constructor(private _auth : AuthService, private _common : CommonService, private _router : Router){}
  mobile : string = '';
  msg_id : string = '';
  otp_msg : string = '';

  sendOtp(){
    let mobile = "+91" + this.mobile
    let obj = { mobile };
    this.msg_id = '';
    this.otp_msg = '';
    this._auth.sendOtp(obj).subscribe(res=>{
      this._common.showToastr("success", "OTP Sent Successfully...");
      this.msg_id = res['msg_id'];
      this.otp_msg = res['otp'];
    }, err=>{
      this._common.showToastr("error", err.error.message);
    })
  }

  verifyOtp(){
    let mobile = "+91" + this.mobile
    let obj = { 
      mobile, 
      msg_id : this.msg_id,
      otp : this.otp_msg
     };
    this._auth.verifyOtp(obj).subscribe(res=>{
      this._common.showToastr("success", "OTP Verified Successfully...");
      localStorage.setItem("token", res['token']);
      this._router.navigateByUrl('/app/dashboard');
    }, err=>{
      this._common.showToastr("error", err.error.message);
    })
  }

}
