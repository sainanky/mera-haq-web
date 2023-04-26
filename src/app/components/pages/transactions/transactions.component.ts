import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ConfigService } from 'src/app/services/config/config.service';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {

  constructor(private _config : ConfigService, private modalService : NgbModal){}

  dataArr : any = [];
  isDataLoading : boolean = false;
  limit : number = 100;
  start : number = 0;
  fromDate : string = '';
  toDate : string = '';
  period_val : string = 'week';
  @ViewChild("periodModal") periodModal: TemplateRef<any>;

  ngOnInit(){
    this.onDateChange('week');
  }

  getOrders(){
    let obj = {
      fromDate : this.fromDate,
      toDate : this.toDate,
      start : this.start,
      limit : this.limit
    }
    this.isDataLoading = true;
    return this._config.getOrders(obj).subscribe(res=>{
      this.isDataLoading = false;
      if(res['data']){
        this.dataArr = res['data'];
      }
    },err=>{
      this.isDataLoading = false;
    })
  }

  onDateChange(val){
    let fromDate = moment().format('YYYY-MM-DD');
    let toDate = moment().format('YYYY-MM-DD');
    if(val == 'week'){
      fromDate = moment(fromDate).subtract(7, 'days').format('YYYY-MM-DD');
    }
    else if(val == 'month'){
      fromDate = this.addRealMonth(moment());
    }
    else if(val == 'custom'){
      this.openModal();
      this.period_val = 'today';
      return false;
    }
    else if(val == 'filter'){
      this.modalService.dismissAll();
      this.getOrders();
      return false;
    }
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.getOrders();
  }

  addRealMonth(d) {
    var fm = moment(d).subtract(1, 'M');
    var fmEnd = moment(fm).endOf('month');
    return d.date() != fm.date() && fm.isSame(fmEnd.format('YYYY-MM-DD')) ? fm.add(1, 'd').format('YYYY-MM-DD') : fm.format('YYYY-MM-DD');  
  }

  openModal(){
    this.modalService.open(this.periodModal, { size : 'lg', centered : true });
  }
}
