import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  constructor(private _category : CategoryService){}

  ngOnInit(){
    this.getList();
  }

  getList(){
    this._category.get().subscribe(res=>{
      console.log(res)
    })
  }
}
