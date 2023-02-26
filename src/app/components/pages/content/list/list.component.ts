import { Component } from '@angular/core';
import { ContentService } from 'src/app/services/content/content.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent {
  dataArr : any = [];
  isDataLoading : boolean = false;

  constructor(private _content : ContentService){}

  ngOnInit(){
    this.getList();
  }

  getList(){
    this.isDataLoading = true;
    this._content.get().subscribe(res=>{
      this.isDataLoading = false;
      this.dataArr = res['data'];
    },err=>{
      this.isDataLoading = false;
    })
  }

}
