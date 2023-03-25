import { Component } from '@angular/core';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private _config : ConfigService){}
  usersCount : any = {};
  paymentCount : any = {};
  limit : number = 10;
  ordersArr : any = [];

  ngOnInit(){
    this.getDashboardCount('users');
    this.getDashboardCount('payments');
    this.getOrders();
  }

  getDashboardCount(type){
    this._config.getDashboardCounts(type).subscribe(res=>{
      if(res['data']){
        if(type == 'users') this.usersCount = res['data'];
        if(type == 'payments') this.paymentCount = res['data'];
      }
    })
  }

  getOrders(){
    let obj = {
      limit : this.limit
    }
    return this._config.getOrders(obj).subscribe(res=>{
      if(res['data']){
        this.ordersArr = res['data'];
      }
    })
  }
}
