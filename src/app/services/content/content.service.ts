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

  save(body){
    return this._http.post(`/content`, body);
  }

  update(body, CN_ID){
    return this._http.put(`/content/${CN_ID}`, body);
  }

  get(){
    return this._http.get(`/content`);
  }

  getByID(CN_ID){
    return this._http.get(`/content/${CN_ID}`);
  }

  getStates(){
    return this._http.get(`/states/list`);
  }
}
