import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {

  constructor(private _users : UsersService, private _route : ActivatedRoute, private _common : CommonService){}
  
  U_ID : string = '';
  userInfo : any = {};
  refInfo : any = {};
  isSubmitLoading : boolean = false;

  ngOnInit(){
    this._route.queryParams.subscribe(res=>{
      let { UID } = res;
      if(UID){
        this.U_ID = UID;
        this.getInfo();
        this.getRefInfo();
      }
    });
  }

  getInfo(){
    this._users.getInfo(this.U_ID).subscribe(res=>{
      if(res['data']){
        let { data } = res;
        this.userInfo = data;
      }
    })
  }

  getRefInfo(){
    this._users.getRefInfo(this.U_ID).subscribe(res=>{
      if(res['data']){
        this.refInfo = res['data'];
      }
    })
  }

  updateUserStatus(UID, IS_PAID){
    let obj = {
      IS_PAID : IS_PAID
    }
    this.isSubmitLoading = true;
    this._users.updateUserStatus(UID, obj).subscribe(res=>{
      this.isSubmitLoading = false;
      this.userInfo.IS_PAID = IS_PAID;
      this._common.showToastr("success", `Marked As ${IS_PAID == 0 ? 'Unpaid' : 'Paid'}...`);
    },err=>{
      this.isSubmitLoading = false;
      this._common.showToastr("error", "Sorry some error occurred...");
    })
  }
}
