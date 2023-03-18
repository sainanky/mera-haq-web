import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  constructor(private _config : ConfigService, private _router : Router){}

  dataArr : any = [];
  isDataLoading : boolean = false

  ngOnInit(){
    this.getStates();
  }

  getStates(){
    this.isDataLoading = true;
    this._config.getStates().subscribe(res=>{
      this.isDataLoading = false;
      this.dataArr = res['data'];
    },err=>{
      this.isDataLoading = false;
    })
  }

  routeToCreate(row){
    localStorage.setItem("stateInfo", JSON.stringify(row));
    this._router.navigate(['/app/states/create'],  { queryParams : { name : row?.state}});
  }

}
