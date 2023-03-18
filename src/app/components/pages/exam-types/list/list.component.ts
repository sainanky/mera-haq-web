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
    this.getExams();
  }

  getExams(){
    this.isDataLoading = true;
    this._config.getExams().subscribe(res=>{
      this.isDataLoading = false;
      this.dataArr = res['data'];
    },err=>{
      this.isDataLoading = false;
    })
  }

  routeToCreate(row){
    localStorage.setItem("examTypeInfo", JSON.stringify(row));
    this._router.navigate(['/app/exams/create'],  { queryParams : { name : row?.NAME}});
  }

}
