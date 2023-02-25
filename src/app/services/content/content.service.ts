import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private _http : HttpService) { }

  fileUpload(file: FormData) {
    return this._http.uploadFile('/upload/file', file);
  }
}
