import { Component, OnInit } from "@angular/core";
import { ValidateService } from "src/app/services/auth/otp-validate.service";
import { SendOtpService } from "src/app/services/auth/send-otp.service";
import { OTP } from "../interface/otp.interface";
import { ValidOTP } from "../interface/valid-otp.interface";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  showPassword = false;
  loginForm!: FormGroup;
  otpDetails!: OTP;
  validOtp!:boolean;
  otpResponse!: ValidOTP;
  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private sendOtpService: SendOtpService,
    private validateService: ValidateService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      mobileNumber: new FormControl("", [
        Validators.required,
        Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
      ]),
      otp: new FormControl("", [Validators.required]),
    });

    this.loginForm.get("mobileNumber")?.valueChanges.subscribe((x) => {
      if (x.length === 10) {
        this.sendOtpService.sendOTP(x).subscribe((response: OTP) => {
          if (response.otp) {
            this.otpDetails = response;
            console.log(this.otpDetails )
            this.showPassword = true;
          }
        });
      }
    });
  }

  get loginFormControls() {
    return this.loginForm.controls;
  }

  login() {
    const req = {
      mobile: `+91${this.loginForm.controls["mobileNumber"].value}`,
      msg_id: this.otpDetails.msg_id,
      otp: this.loginForm.controls["otp"].value,
    };
    this.validateService
      .validateOTP(req)
      .subscribe((response: ValidOTP) => {
        this.otpResponse = response;
      });
  }
}
