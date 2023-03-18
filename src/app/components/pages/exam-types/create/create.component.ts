import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { ContentService } from 'src/app/services/content/content.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {

  constructor(private _route : ActivatedRoute, private _config : ConfigService, private _content : ContentService,
    private _common : CommonService, private _router : Router){}
  selectedData : any = {};
  name_val : string = '';
  image_val : string = '';
  fileObj: File;

  ngOnInit(){
    this._route.queryParams.subscribe(res=>{
      if(res['name'] && localStorage.getItem('examTypeInfo')){
        this.selectedData = JSON.parse(localStorage.getItem('examTypeInfo'));
        this.name_val = this.selectedData.NAME;
        this.image_val = this.selectedData.image;
      }
    })
  }

  onFilePicked(event: Event): void {
    const FILE = (event.target as HTMLInputElement).files[0];
    this.fileObj = FILE;
    this.onFileUpload();
  }

  onFileUpload() {
    if (!this.fileObj) {
      return false;
    }
    const fileForm = new FormData();
    fileForm.append('file', this.fileObj);
    this._content.fileUpload(fileForm).subscribe(res => {
      this.image_val = res['imageUrl'];
    });
  }
  
  submit(){
    let obj = {
      IMAGE : this.image_val,
      NAME : this.name_val
    }
    this._common.toggleProgressLoader(true);
    this._config.saveExams(obj).subscribe(res=>{
      this._common.toggleProgressLoader(false);
      this._common.showToastr("success", "Updated Successfully...");
      this._router.navigateByUrl('/app/exams/list');
    }, err=>{
      this._common.toggleProgressLoader(false);
    })
  }

  update(){
    let obj = {
      IMAGE : this.image_val,
      NAME : this.name_val
    }
    this._common.toggleProgressLoader(true);
    this._config.updateExams(this.selectedData.NAME, obj).subscribe(res=>{
      this._common.toggleProgressLoader(false);
      this._common.showToastr("success", "Updated Successfully...");
      this._router.navigateByUrl('/app/exams/list');
    }, err=>{
      this._common.toggleProgressLoader(false);
    })
  }
}
