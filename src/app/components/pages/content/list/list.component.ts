import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { ContentService } from 'src/app/services/content/content.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent {
  dataArr : any = [];
  isDataLoading : boolean = false;
  categoryArr : any = [];

  constructor(private _content : ContentService, private _category : CategoryService){}

  ngOnInit(){
    this.getList('');
    this.getCategories();
  }

  getList(C_ID){
    this.isDataLoading = true;
    this._content.get(C_ID).subscribe(res=>{
      this.isDataLoading = false;
      this.dataArr = res['data'];
    },err=>{
      this.isDataLoading = false;
    })
  }

  getCategories(){
    this._category.get().subscribe(res=>{
      if(res['data']){
        this.categoryArr = res['data'];
      }
    },err=>{
      // this.isDataLoading = false;
    })
  }

}
