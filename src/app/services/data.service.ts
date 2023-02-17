import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http : HttpService) { }

  getCategoryList(){
    return this._http.get('/category');
  }
}
