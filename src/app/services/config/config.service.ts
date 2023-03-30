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

  getStates(){
    return this._http.get(`/config/state`);
  }

  getExams(){
    return this._http.get(`/config/exams`);
  }

  saveExams(body){
    return this._http.post(`/config/exams`, body);
  }

  updateExams(DATA_NAME, body){
    return this._http.put(`/config/exams/${DATA_NAME}`, body);
  }

  update(values){
    return this._http.put(`/config`, values);
  }

  saveState(body){
    return this._http.post(`/config/state`, body);
  }

  updateState(DATA_NAME, body){
    return this._http.put(`/config/state/${DATA_NAME}`, body);
  }

  getDashboardCounts(type){
    return this._http.get(`/config/dashboard-counts?type=${type}`);
  }

  getOrders(body){
    return this._http.post(`/order/list`, body);
  }

  translateLanguage(content){
    let body = { content : content, language : 'hi' };
    return this._http.post(`/translate/language`, body);
  }
}
