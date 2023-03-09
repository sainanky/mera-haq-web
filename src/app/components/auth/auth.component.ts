import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { WindowService } from 'src/app/services/window/window.service';
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { environment } from 'src/environments/environment';

const firebaseConfig = environment.firebase;
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  constructor(private _auth : AuthService, private _common : CommonService, private _router : Router,
    private win: WindowService, public afs: AngularFirestore,
    public afAuth: AngularFireAuth,){}
  mobile : string = '';
  isApiLoading : boolean = false;
  countDown:Subscription;
  counter = 0;
  tick = 1000;
  windowRef: any;
  msg_id : string = '';
  otp_msg : string = '';

  ngOnInit(){
    // this.windowRef = this.win.windowRef;
    // this.windowRef.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
    //   'size': 'invisible',
    //   'callback': (response) => {
    //     console.log("response =", response)
    //   }
    // }, auth);

    // this.windowRef.recaptchaVerifier.render();
  }

  sendOtp(){
    let mobile = "+91" + this.mobile
    const appVerifier = this.windowRef.recaptchaVerifier;
    this.msg_id = '';
    this.isApiLoading = true;
    this.afAuth.signInWithPhoneNumber(mobile, appVerifier)
    .then((result : any) => {
      this.windowRef.confirmationResult = result;
      this.msg_id = result;
      this.startCountdown();
      this._common.showToastr("success", `We have sent verification code to ${mobile}`);
      this.isApiLoading = false;
    })
    .catch( (error : any) => {
      console.log(error);
      this.isApiLoading = false;
      this._common.showToastr("error", "Exceeded per phone number quota for sending verification codes");
    });
  }

  submit(){
    let mobile = this.mobile
    let obj = { mobile };
    this.isApiLoading = true;
    this._auth.sendOtp(obj).subscribe(res=>{
      this.isApiLoading = false;
      // this.sendOtp(mobile);
      this.msg_id = res['msg_id'];
      this.startCountdown();
      this._common.showToastr("success", `We have sent verification code to ${mobile}`);
      this.isApiLoading = false;
    }, err=>{
      this.isApiLoading = false;
      this._common.showToastr("error", err.error.message);
    })
  }

  verifyOtp(){
    this.isApiLoading = true;
    let obj = {
      msg_id : this.msg_id,
      code : this.otp_msg
    }
    this._auth.verifyOtp(obj).subscribe(res=>{
      this.isApiLoading = false;
      this._common.showToastr("success", "OTP Verified Successfully...");
      localStorage.setItem("token", res['token']);
      this._router.navigateByUrl('/app/dashboard');
    }, err=>{
      this.isApiLoading = false;
      this._common.showToastr("error", err.error.message);
    })
  }

  startCountdown(){
    this.counter = 60;
    this.countDown = timer(0, this.tick)
      .subscribe(() => --this.counter)
  }

  ngOnDestroy(){
    this.countDown=null;
  }

}
