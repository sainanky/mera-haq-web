import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http : HttpService) { }

  getList(){
    return this._http.get(`/user/list`);
  }

  getInfo(U_ID){
    return this._http.get(`/user/info/${U_ID}`);
  }
}
