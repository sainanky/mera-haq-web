import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private _http : HttpService) { }

  get(){
    return this._http.get(`/config`);
  }

  update(values){
    return this._http.put(`/config`, values);
  }
}
