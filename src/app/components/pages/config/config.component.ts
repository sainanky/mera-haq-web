import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { ContentService } from 'src/app/services/content/content.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent {

  constructor(private fb : FormBuilder, private _content : ContentService, private _config : ConfigService,
    private _common : CommonService){}
  configForm : FormGroup;
  loginSliderImgArr : any = [];
  giftSliderImgArr : any = [];
  homeSliderImgArr : any = [];
  isApiLoadig : boolean = false;

  ngOnInit(){
    this.configForm = this.fb.group({
      REGISTRATION_AMOUNT : new FormControl(''),
      REGISTRATION_GST_PERCENTAGE : new FormControl(''),
      REF_BY_AMOUNT : new FormControl(''),
      REF_TO_AMOUNT : new FormControl(''),
      HOME_PAGE_NOTIFICATION_MSG : new FormControl('')
    });
    this.getData();
  }

  onFilePicked(event: Event, type): void {
    const FILE = (event.target as HTMLInputElement).files[0];
    let fileObj = FILE;
    this.onFileUpload(fileObj, type);
  }

  onFileUpload(fileObj, type) {
    if (!fileObj) {
      return false;
    }
    this._common.toggleProgressLoader(true);
    this._common.showToastr("info", "upload starting...");
    const fileForm = new FormData();
    fileForm.append('file', fileObj);
    this._content.fileUpload(fileForm).subscribe(res => {
      this._common.toggleProgressLoader(false);
      this._common.showToastr("success", "uploaded successfully...");
      if(type == 'login') this.loginSliderImgArr.push(res['imageUrl']);
      else if(type == 'gift') this.giftSliderImgArr.push(res['imageUrl']);
      else if(type == 'home') this.homeSliderImgArr.push(res['imageUrl']);
    },err=>{
      this._common.toggleProgressLoader(false);
      this._common.showToastr("error", "some error ocurred");
    });
  }

  removeSliderImage(idx, type){
    if(type == 'login') this.loginSliderImgArr.splice(idx, 1);
    else if(type == 'gift') this.giftSliderImgArr.splice(idx, 1);
    else if(type == 'home') this.homeSliderImgArr.splice(idx, 1);
  }

  getData(){
    this._common.toggleProgressLoader(true);
    this._config.get().subscribe(res=>{
      this._common.toggleProgressLoader(false);
      let { data } = res;
      if(Object.keys(data).length > 0){
        this.configForm.controls.REGISTRATION_AMOUNT.setValue(data['REGISTRATION_AMOUNT']);
        this.configForm.controls.REGISTRATION_GST_PERCENTAGE.setValue(data['REGISTRATION_GST_PERCENTAGE']);
        this.configForm.controls.REF_BY_AMOUNT.setValue(data['REF_BY_AMOUNT']);
        this.configForm.controls.REF_TO_AMOUNT.setValue(data['REF_TO_AMOUNT']);
        this.configForm.controls.HOME_PAGE_NOTIFICATION_MSG.setValue(data['HOME_PAGE_NOTIFICATION_MSG']);
        if(data['AUTH_PAGE_SLIDER']) this.loginSliderImgArr = data['AUTH_PAGE_SLIDER'];
        if(data['GIFT_PAGE_SLIDER']) this.giftSliderImgArr = data['GIFT_PAGE_SLIDER'];
        if(data['HOME_PAGE_SLIDER']) this.homeSliderImgArr = data['HOME_PAGE_SLIDER'];
      }
    },err=>{
      this._common.toggleProgressLoader(false);
    })
  }

  submit(){
    let values = this.configForm.value;
    values.AUTH_PAGE_SLIDER = this.loginSliderImgArr.length > 0 ? this.loginSliderImgArr.join(',') : '';
    values.GIFT_PAGE_SLIDER = this.giftSliderImgArr.length > 0 ? this.giftSliderImgArr.join(',') : '';
    values.HOME_PAGE_SLIDER = this.homeSliderImgArr.length > 0 ? this.homeSliderImgArr.join(',') : '';
    this.isApiLoadig = true;
    this._common.toggleProgressLoader(true);
    this._config.update(values).subscribe(res=>{
      this.isApiLoadig = false;
      this._common.toggleProgressLoader(false);
      this._common.showToastr("success", "Updated");
    },err=>{
      this.isApiLoadig = false;
      this._common.toggleProgressLoader(false);
      this._common.showToastr("error", "Sorry some error occurred...");
    })
  }

}
