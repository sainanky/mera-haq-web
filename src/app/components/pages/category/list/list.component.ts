import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  constructor(private _category : CategoryService){}

  dataArr : any = [];
  isDataLoading : boolean = false;

  ngOnInit(){
    this.getList();
  }

  getList(){
    this.isDataLoading = true;
    this._category.get().subscribe(res=>{
      console.log(res)
      this.isDataLoading = false;
      if(res['data']){
        this.dataArr = res['data'];
      }
    },err=>{
      this.isDataLoading = false;
    })
  }
}
