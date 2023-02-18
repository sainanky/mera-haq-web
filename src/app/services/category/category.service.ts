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
}
