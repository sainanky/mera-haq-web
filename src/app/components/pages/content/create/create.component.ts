import { HttpEvent } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Observable } from 'rxjs/internal/Observable';
import { CategoryService } from 'src/app/services/category/category.service';
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
    private fb : FormBuilder, private sanitizer : DomSanitizer){}

  errorMsg : boolean = false;
  fileObj: File;
  fileUrl: string;
  categoryArr : any = [];
  createForm : FormGroup;
  currAttcIndex : number = 0;
  currYoutubeIndex : number = 0;

  ngOnInit(){
    this.getCategory();
    this.createForm = this.fb.group({
      CATEGORY : new FormControl('', Validators.required),
      NAME : new FormControl('', Validators.required),
      DESCRIPTION : new FormControl('', Validators.required),
      ATTACHMENTS : this.fb.array([]),
      YOUTUBE_LINKS : this.fb.array([]),
    });
    setTimeout(() => {
      this.addAttachment();
      this.addYoutube();
    }, 1000);
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

  onFilePicked(event: Event, idx : Number): void {
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
    const fileForm = new FormData();
    fileForm.append('file', this.fileObj);
    this._content.fileUpload(fileForm).subscribe(res => {
      this.ATTACHMENTS.controls[idx]['controls']['URL'].setValue(res['imageUrl']);
    });
  }

  addAttachment() {
    this.ATTACHMENTS.push(this.newAttachment({ NAME : '', URL : '', TYPE : ''}));
  }

  addYoutube() {
    this.YOUTUBE_LINKS.push(this.newYoutubeLinks({ NAME : '', URL : '' }));
  }

  newAttachment(value): FormGroup {
    return this.fb.group({
      NAME: new FormControl(value.NAME, Validators.required),
      URL: new FormControl(value.URL),
      TYPE: new FormControl(value.NAME, Validators.required),
      IS_SUBMIT : false
    });
  }

  newYoutubeLinks(value): FormGroup {
    return this.fb.group({
      NAME: new FormControl(value.NAME, Validators.required),
      URL: new FormControl(value.URL),
      IS_SUBMIT : false
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
    console.log(this.createForm.value)
    let attachmentArr = this.ATTACHMENTS.value;
    attachmentArr = attachmentArr.filter(v => v.IS_SUBMIT && v.URL);
    
  }
}
