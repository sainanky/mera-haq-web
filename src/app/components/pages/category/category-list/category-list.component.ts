import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  constructor(private _data : DataService, private _router : Router,
    private _common : CommonService) { }

  ngOnInit(): void {
    this.getDomainList();
  }

  getDomainList(){
    this._data.getCategoryList().subscribe(res=>{
      if(res){
        console.log(res)
      }
    })
  }

}
