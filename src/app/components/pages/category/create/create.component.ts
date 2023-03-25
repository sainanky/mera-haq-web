import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';
import { CommonService } from 'src/app/services/common.service';
import { ContentService } from 'src/app/services/content/content.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {

  constructor(private _route : ActivatedRoute, private _category : CategoryService, 
    private fb : FormBuilder, private _content : ContentService, private _common : CommonService,
    private _router : Router) {}

  C_ID : string = '';
  createForm : FormGroup;
  fileObj: File;
  fileUrl: string;

  ngOnInit(){
    this._route.queryParams.subscribe(res=>{
      let { C_ID } = res;
      this.C_ID = C_ID;
      if(C_ID) this.getInfo();
    });
    this.createForm = this.fb.group({
      NAME : new FormControl('', Validators.required),
      COLOR : new FormControl('#000'),
      DESCRIPTION : new FormControl(''),
      ICON_URL : new FormControl('')
    });
  }

  get NAME(){
    return this.createForm.controls['NAME'];
  }

  getInfo(){
    this._category.getByID(this.C_ID).subscribe(res=>{
      console.log(res)
      if(res['data']){
        let { data } = res;
        this.createForm.controls.NAME.setValue(data.NAME);
        this.createForm.controls.ICON_URL.setValue(data.ICON_URL);
        this.createForm.controls.COLOR.setValue(data.COLOR);
        this.createForm.controls.DESCRIPTION.setValue(data.DESCRIPTION);
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
    this._common.toggleProgressLoader(true);
    const fileForm = new FormData();
    fileForm.append('file', this.fileObj);
    this._content.fileUpload(fileForm).subscribe(res => {
      this._common.toggleProgressLoader(false);
      this.createForm.controls.ICON_URL.setValue(res['imageUrl']);
    });
  }

  submit(){
    if(!this.createForm.valid){
      this._common.showToastr("error", "Please fill form correctly...");
      return false;
    }this._common.toggleProgressLoader(true);
    this._category.save(this.createForm.value).subscribe(res=>{
      this._common.toggleProgressLoader(false);
      this._common.showToastr("success", "Saved Successfully...");
      setTimeout(() => {
        this._router.navigateByUrl('/app/category/list');
      }, 1500);
    },err=>{
      this._common.toggleProgressLoader(false);
      this._common.showToastr("error", err.error.message);
    })
  }

  update(){
    if(!this.createForm.valid){
      this._common.showToastr("error", "Please fill form correctly...");
      return false;
    }this._common.toggleProgressLoader(true);
    this._category.update(this.createForm.value, this.C_ID).subscribe(res=>{
      this._common.showToastr("success", "Updated Successfully...");
      this._common.toggleProgressLoader(false);
      setTimeout(() => {
        this._router.navigateByUrl('/app/category/list');
      }, 1500);
    },err=>{
      this._common.toggleProgressLoader(false);
      this._common.showToastr("error", err.error.message);
    })
  }
}
