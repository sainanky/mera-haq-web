import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http : HttpService) { }

  get(){
    return this._http.get(`/category`);
  }

  getByID(C_ID){
    return this._http.get(`/category/${C_ID}`);
  }

  save(body){
    return this._http.post('/category', body);
  }

  update(body, C_ID){
    return this._http.put('/category/'+C_ID, body);
  }
}
