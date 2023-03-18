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
  state_val : string = '';
  image_val : string = '';
  fileObj: File;

  ngOnInit(){
    this._route.queryParams.subscribe(res=>{
      if(res['name'] && localStorage.getItem('stateInfo')){
        this.selectedData = JSON.parse(localStorage.getItem('stateInfo'));
        this.state_val = this.selectedData.state;
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
      NAME : this.state_val
    }
    this._common.toggleProgressLoader(true);
    this._config.saveState(obj).subscribe(res=>{
      this._common.toggleProgressLoader(false);
      this._common.showToastr("success", "Updated Successfully...");
      this._router.navigateByUrl('/app/states/list');
    }, err=>{
      this._common.toggleProgressLoader(false);
    })
  }

  update(){
    let obj = {
      IMAGE : this.image_val,
      NAME : this.state_val
    }
    this._common.toggleProgressLoader(true);
    this._config.updateState(this.selectedData.state, obj).subscribe(res=>{
      this._common.toggleProgressLoader(false);
      this._common.showToastr("success", "Updated Successfully...");
      this._router.navigateByUrl('/app/states/list');
    }, err=>{
      this._common.toggleProgressLoader(false);
    })
  }
}
