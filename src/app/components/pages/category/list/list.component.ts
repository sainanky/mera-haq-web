import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  constructor(private _category : CategoryService, private _config : ConfigService){}

  dataArr : any = [];
  isDataLoading : boolean = false;

  ngOnInit(){
    this.getList();
    // this.translateLanguage("Students Corner");
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

  translateLanguage(content){
    this._config.translateLanguage(content).subscribe(res=>{
      console.log("res =", res)
    })
  }
}
