import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'src/app/services/category/category.service';
import { CommonService } from 'src/app/services/common.service';
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
  selectedData : any = {};
  categoryVal : string = '';

  constructor(private _content : ContentService, private _category : CategoryService, private modal : NgbModal,
    private _common : CommonService){}

  ngOnInit(){
    this.getList('');
    this.getCategories();
  }

  getList(C_ID){
    this.categoryVal = C_ID;
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

  openModal(content, size, data){
    this.selectedData = data;
    this.modal.open(content, { size : size, centered : true});
  }

  deleteList(){
    console.log(this.selectedData)
    let { CN_ID } = this.selectedData;
    this.modal.dismissAll();
    this._common.toggleProgressLoader(true);
    this._content.delete(CN_ID).subscribe(res=>{
      this._common.toggleProgressLoader(false);
      this._common.showToastr("success", "Deleted Successfully...");
      this.getList(this.categoryVal);
    },err=>{
      this._common.toggleProgressLoader(false);
      this._common.showToastr("error", err.error.message);
    })
  }

}
