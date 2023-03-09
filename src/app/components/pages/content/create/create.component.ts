import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CategoryService } from 'src/app/services/category/category.service';
import { CommonService } from 'src/app/services/common.service';
import { ContentService } from 'src/app/services/content/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {

  content : any;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '250px',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: environment.url+'/upload/file',
    // upload: (file: File) : Observable<HttpEvent<UploadResponse>> => { 
    //   console.log("file =", file)
    // },
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  constructor(private _content : ContentService, private _category : CategoryService,
    private fb : FormBuilder, private _common : CommonService, private _router : Router,
    private _route : ActivatedRoute){}

  errorMsg : boolean = false;
  fileObj: File;
  fileUrl: string;
  categoryArr : any = [];
  createForm : FormGroup;
  currAttcIndex : number = 0;
  currYoutubeIndex : number = 0;
  CN_ID : string = '';
  isApiLoading : boolean = false;
  stateArr : any = [];

  ngOnInit(){
    this.getCategory();
    this.getStates();
    this.createForm = this.fb.group({
      CATEGORY : new FormControl('', Validators.required),
      NAME : new FormControl('', Validators.required),
      DESCRIPTION : new FormControl(''),
      IS_FEATURED : false,
      BANNER_IMG : '',
      ATTACHMENTS : this.fb.array([]),
      YOUTUBE_LINKS : this.fb.array([]),
      STATE : '',
    });

    this._route.queryParams.subscribe(res=>{
      let { CN_ID } = res;
      this.CN_ID = CN_ID;
      if(CN_ID) {
        setTimeout(() => {
          this.getInfo();
        }, 1000);
      }
      else{
        setTimeout(() => {
          this.addAttachment();
          this.addYoutube();
        }, 1000);
      }
    });
  }

  get CATEGORY(){
    return this.createForm.controls['CATEGORY'];
  }
  get NAME(){
    return this.createForm.controls['NAME'];
  }
  get DESCRIPTION(){
    return this.createForm.controls['DESCRIPTION'];
  }
  get ATTACHMENTS() : FormArray {
    return this.createForm.get("ATTACHMENTS") as FormArray
  }
  get YOUTUBE_LINKS() : FormArray {
    return this.createForm.get("YOUTUBE_LINKS") as FormArray
  }

  getCategory(){
    this._category.get().subscribe(res=>{
      console.log(res);
      if(res['data']){
        this.categoryArr = res['data'];
      }
    })
  }

  onFilePicked(event: Event, idx : any): void {
    this.errorMsg = false
    const FILE = (event.target as HTMLInputElement).files[0];
    this.fileObj = FILE;
    this.onFileUpload(idx);
  }

  onFileUpload(idx) {
    if (!this.fileObj) {
      this.errorMsg = true
      return
    }
    this._common.toggleProgressLoader(true);
    this._common.showToastr("info", "uploading started");
    const fileForm = new FormData();
    fileForm.append('file', this.fileObj);
    this._content.fileUpload(fileForm).subscribe(res => {
      this._common.toggleProgressLoader(false);
      this._common.showToastr("success", "uploading finished");
      if(idx == 'banner') this.createForm.controls.BANNER_IMG.setValue(res['imageUrl']);
      else this.ATTACHMENTS.controls[idx]['controls']['URL'].setValue(res['imageUrl']);
    },err=>{
      this._common.toggleProgressLoader(false);
      this._common.showToastr("error", "uploading failed");
    });
  }

  addAttachment() {
    this.ATTACHMENTS.push(this.newAttachment({ NAME : '', URL : '', TYPE : '', IS_SUBMIT : false}));
  }

  addYoutube() {
    this.YOUTUBE_LINKS.push(this.newYoutubeLinks({ NAME : '', URL : '', IS_SUBMIT : false }));
  }

  newAttachment(value): FormGroup {
    return this.fb.group({
      NAME: new FormControl(value.NAME),
      URL: new FormControl(value.URL),
      TYPE: new FormControl(value.TYPE),
      IS_SUBMIT : value.IS_SUBMIT
    });
  }

  newYoutubeLinks(value): FormGroup {
    return this.fb.group({
      NAME: new FormControl(value.NAME),
      URL: new FormControl(value.URL),
      IS_SUBMIT : value.IS_SUBMIT
    });
  }

  removeAttachment(i:number) {
    this.ATTACHMENTS.removeAt(i);
    this.currAttcIndex--;
  }

  removeYoutube(i:number) {
    this.YOUTUBE_LINKS.removeAt(i);
    this.currYoutubeIndex--;
  }

  submitAttachment(){
    this.ATTACHMENTS.controls[this.currAttcIndex]['controls']['IS_SUBMIT'].setValue(true);
    this.addAttachment();
    this.currAttcIndex++;
  }

  submitYoutubeLinks(){
    this.YOUTUBE_LINKS.controls[this.currYoutubeIndex]['controls']['IS_SUBMIT'].setValue(true);
    this.addYoutube();
    this.currYoutubeIndex++;
  }

  submit(){
    if(!this.createForm.valid){
      this._common.showToastr("error", "Please fill form correctly...");
    }
    let { CATEGORY, NAME, DESCRIPTION, IS_FEATURED, BANNER_IMG, ATTACHMENTS, YOUTUBE_LINKS, STATE } = this.createForm.value;
    let attachmentArr = [], youtubeLinksArr = [];
    if(ATTACHMENTS.length > 0){
      for(let i = 0; i < ATTACHMENTS.length; i++){
        let v = ATTACHMENTS[i];
        if(v.URL) attachmentArr.push({NAME : v.NAME, TYPE : v.TYPE ? v.TYPE : 'image', URL : v.URL});
      }
    }
    if(YOUTUBE_LINKS.length > 0){
      for(let i = 0; i < YOUTUBE_LINKS.length; i++){
        let v = YOUTUBE_LINKS[i];
        if(v.URL) youtubeLinksArr.push({NAME : v.NAME, URL : v.URL});
      }
    }
    let obj = { 
      CATEGORY, 
      NAME, 
      DESCRIPTION, 
      IS_FEATURED : IS_FEATURED ? 1 : 0,
      BANNER_IMG : BANNER_IMG,
      ATTACHMENTS : attachmentArr, 
      YOUTUBE_LINKS : youtubeLinksArr,
      STATE
    };
    this._common.toggleProgressLoader(true);
    this.isApiLoading = true;
    this._content.save(obj).subscribe(res=>{
      this._common.toggleProgressLoader(false);
      this.isApiLoading = false;
      this._common.showToastr("success", "Saved Successfully...");
      this.createForm.reset();
      setTimeout(() => {
        this._router.navigateByUrl('/app/content/list');
      }, 1500);
    },err=>{
      console.log(err);
      this._common.toggleProgressLoader(false);
      this.isApiLoading = false;
      this._common.showToastr("error", err.error.message);
    })
  }

  update(){
    // if(!this.createForm.valid){
    //   this._common.showToastr("error", "Please fill form correctly...");
    // }
    let { CATEGORY, NAME, DESCRIPTION, IS_FEATURED, BANNER_IMG, ATTACHMENTS, YOUTUBE_LINKS, STATE } = this.createForm.value;
    let attachmentArr = [], youtubeLinksArr = [];
    if(ATTACHMENTS.length > 0){
      for(let i = 0; i < ATTACHMENTS.length; i++){
        let v = ATTACHMENTS[i];
        if(v.URL) attachmentArr.push({NAME : v.NAME, TYPE : v.TYPE ? v.TYPE : 'image', URL : v.URL});
      }
    }
    if(YOUTUBE_LINKS.length > 0){
      for(let i = 0; i < YOUTUBE_LINKS.length; i++){
        let v = YOUTUBE_LINKS[i];
        if(v.URL) youtubeLinksArr.push({NAME : v.NAME, URL : v.URL});
      }
    }
    let obj = { 
      CATEGORY, 
      NAME, 
      DESCRIPTION, 
      IS_FEATURED : IS_FEATURED ? 1 : 0,
      BANNER_IMG : BANNER_IMG,
      ATTACHMENTS : attachmentArr, 
      YOUTUBE_LINKS : youtubeLinksArr,
      STATE
    };
    this._common.toggleProgressLoader(true);
    this.isApiLoading = true;
    this._content.update(obj, this.CN_ID).subscribe(res=>{
      this._common.toggleProgressLoader(false);
      this.isApiLoading = false;
      this._common.showToastr("success", "Updated Successfully...");
      this.createForm.reset();
      setTimeout(() => {
        this._router.navigateByUrl('/app/content/list');
      }, 1500);
    },err=>{
      console.log(err);
      this._common.toggleProgressLoader(false);
      this.isApiLoading = false;
      this._common.showToastr("error", err.error.message);
    })
  }

  getInfo(){
    this._common.toggleProgressLoader(true);
    this._content.getByID(this.CN_ID).subscribe(res=>{
      this._common.toggleProgressLoader(false);
      if(res['data']){
        let { data } = res;
        this.createForm.controls.CATEGORY.setValue(data.C_ID);
        this.createForm.controls.NAME.setValue(data.NAME);
        this.createForm.controls.IS_FEATURED.setValue(data.IS_FEATURED == 1 ? true : false);
        this.createForm.controls.BANNER_IMG.setValue(data.BANNER_IMG);
        this.createForm.controls.DESCRIPTION.setValue(data.DESCRIPTION);
        this.createForm.controls.STATE.setValue(data.STATE);
        if(data.ATTACHMENTS.length > 0){
          for(let i = 0; i < data.ATTACHMENTS.length; i++){
            let v = data.ATTACHMENTS[i];
            this.ATTACHMENTS.push(this.newAttachment({ ...v, IS_SUBMIT : true}));
          }
        }
        else this.addAttachment();
        if(data.YOUTUBE_LINKS.length > 0){
          for(let i = 0; i < data.YOUTUBE_LINKS.length; i++){
            let v = data.YOUTUBE_LINKS[i];
            this.YOUTUBE_LINKS.push(this.newYoutubeLinks({ ...v, IS_SUBMIT : true}));
          }
        }
        else this.addYoutube();
      }
    },err=>{
      this._common.toggleProgressLoader(false);
    })
  }

  getStates(){
    this._content.getStates().subscribe(res=>{
      this.stateArr = res['data'];
    })
  }
}
