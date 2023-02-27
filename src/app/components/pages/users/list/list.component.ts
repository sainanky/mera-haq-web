import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  constructor(private _users : UsersService){}

  dataArr : any = [];
  isDataLoading : boolean = false;

  ngOnInit(){
    this.getList();
  }

  getList(){
    this.isDataLoading = true;
    this._users.getList().subscribe(res=>{
      console.log(res);
      this.isDataLoading = false;
      if(res['data']){
        let { data } = res;
        this.dataArr = data;
      }
    },err=>{
      this.isDataLoading = false;
    })
  }

}
