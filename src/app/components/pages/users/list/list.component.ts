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
  cust_name : string = '';
  cust_mobile : string = '';
  start : number = 0;
  limit : number = 50;

  ngOnInit(){
    this.getList();
  }

  getList(){
    this.isDataLoading = true;
    let obj = {
      name : this.cust_name,
      mobile : this.cust_mobile,
      start : this.start,
      limit : this.limit
    }
    this._users.getList(obj).subscribe(res=>{
      this.isDataLoading = false;
      if(res['data']){
        let { data } = res;
        this.dataArr = data;
      }
    },err=>{
      this.isDataLoading = false;
    })
  }

  clearFilter(){
    this.cust_mobile = '';
    this.cust_name = '';
    this.getList();
  }
}
