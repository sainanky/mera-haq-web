import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/auth/otp-validate.service';
import { SendOtpService } from 'src/app/services/auth/send-otp.service';
import { OTP } from '../interface/otp.interface';
import { ValidOTP } from '../interface/valid-otp.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  implements OnInit {
    otpDetails!:OTP;
    validOTP!:ValidOTP;
    constructor(private sendOtpService:SendOtpService, private validateService:ValidateService){
    }

    ngOnInit() {

      this.sendOtpService.sendOTP().subscribe((response: OTP) => {
          this.otpDetails = response;
      });
      this.validateService.validateOTP().subscribe((response:ValidOTP) => {
        this.validOTP = response;
        console.log(response);
      });
    }

    login(values : any){

    }
}
