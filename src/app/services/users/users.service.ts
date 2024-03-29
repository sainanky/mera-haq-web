import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http : HttpService) { }

  getList(query){
    let params = `mobile=${query.mobile}&name=${query.name}&start=${query.start}&limit=${query.limit}`;
    return this._http.get(`/user/list?${params}`);
  }

  getInfo(U_ID){
    return this._http.get(`/user/info?U_ID=${U_ID}`);
  }

  getInfoByMobile(MOBILE){
    return this._http.get(`/user/info?MOBILE=${MOBILE}`);
  }

  getInfoByEmail(EMAIL){
    return this._http.get(`/user/info?EMAIL=${EMAIL}`);
  }

  getRefInfo(UID){
    return this._http.get(`/user/referral/info/${UID}`);
  }

  updateUserStatus(UID, body){
    return this._http.put(`/user/status/${UID}`, body);
  }
}
