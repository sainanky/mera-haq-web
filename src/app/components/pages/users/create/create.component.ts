import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {

  constructor(private _users : UsersService, private _route : ActivatedRoute){}
  U_ID : string = '';

  ngOnInit(){
    this._route.queryParams.subscribe(res=>{
      let { U_ID } = res;
      if(U_ID){
        this.U_ID = U_ID;
        this.getInfo();
      }
    });
  }

  getInfo(){
    this._users.getInfo(this.U_ID).subscribe(res=>{
      console.log(res)
    })
  }
}
