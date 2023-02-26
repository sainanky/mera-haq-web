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
    this._content.get().subscribe(res=>{
      console.log(res);
      this.dataArr = res['data'];
    })
  }

}
