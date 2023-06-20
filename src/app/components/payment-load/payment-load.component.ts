import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-load',
  templateUrl: './payment-load.component.html',
  styleUrls: ['./payment-load.component.scss']
})
export class PaymentLoadComponent {

  constructor(private _route : ActivatedRoute){}
  iframeUrl : string = '';

  ngOnInit(){
    this._route.queryParams.subscribe(res=>{
      if(res['url']){
        this.iframeUrl = res['url'];
      }
    })
  }
}
