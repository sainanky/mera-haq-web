import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {

  constructor(private _users : UsersService, private _route : ActivatedRoute){}
  
  U_ID : string = '';
  userInfo : any = {};

  ngOnInit(){
    this._route.queryParams.subscribe(res=>{
      let { UID } = res;
      if(UID){
        this.U_ID = UID;
        this.getInfo();
      }
    });
  }

  getInfo(){
    this._users.getInfo(this.U_ID).subscribe(res=>{
      console.log(res);
      if(res['data']){
        let { data } = res;
        this.userInfo = data;
      }
    })
  }
}
