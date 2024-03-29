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

  get(C_ID){
    return this._http.get(`/content?C_ID=${C_ID}`);
  }

  getByID(CN_ID){
    return this._http.get(`/content/${CN_ID}`);
  }

  delete(CN_ID){
    return this._http.delete(`/content/${CN_ID}`, {});
  }

}
