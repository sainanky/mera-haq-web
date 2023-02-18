import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { HttpClientModule, HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from '../../environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { CommonService } from './common.service';
// import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
    httpOptions : any;
    constructor(private http: HttpClient, private router : Router, private _common : CommonService, private _router : Router) { }
  
    private loaderSource = new BehaviorSubject(false);
    currentLoaderState = this.loaderSource.asObservable();
  
    toggleLoader(value: boolean) {
      this.loaderSource.next(value)
    }
    
    /**
     * get function to call http get request.
     */
    get(url){
      let httpOptions =  {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'app-origin' : window.location.origin,
          'Authorization': localStorage.getItem('token') ? localStorage.getItem('token') : '',
          'VisitorID' : '',
          'IpAddress' : ''
        })
      }
      this.toggleLoader(true);
      return this.http.get(environment.url + url, httpOptions).pipe(
        map((data: any) => {
          this.toggleLoader(false);
          return data;
        }),
        catchError(this.handleError<string>('stats')));
    }
  
    /**
     * post function to call http post request.
     */
    post(url, body){
      let httpOptions =  {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'app-origin' : window.location.origin,
          'Authorization': localStorage.getItem('token') ? localStorage.getItem('token') : '',
          'VisitorID' : '',
          'IpAddress' : ''
        })
      }
      this.toggleLoader(true);
      return this.http.post(environment.url + url, body, httpOptions).pipe(
        map((data: any[]) => {
          this.toggleLoader(false);
          return data;
        }),
        catchError(this.handleError<string>('stats')));
    }
  
    /**
     * post function to call http post request.
     */
    put(url, body){
      let httpOptions =  {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'app-origin' : window.location.origin,
          'Authorization': localStorage.getItem('token') ? localStorage.getItem('token') : '',
          'VisitorID' : '',
          'IpAddress' : ''
        })
      }
      this.toggleLoader(true);
      return this.http.put(environment.url + url, body, httpOptions).pipe(
        map((data: any[]) => {
          this.toggleLoader(false);
          return data;
        }),
        catchError(this.handleError<string>('stats')));
    }
  
    /**
     * get function to call http delete request.
     */
    delete(url,body){
      let httpOptions =  {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'app-origin' : window.location.origin,
          'Authorization': localStorage.getItem('token') ? localStorage.getItem('token') : '',
          'VisitorID' : '',
          'IpAddress' : ''
        }),
        body: body
      }
      this.toggleLoader(true);
      return this.http.delete(environment.url + url, httpOptions).pipe(
        map((data: any) => {
          this.toggleLoader(false);
          return data;
        }),
        catchError(this.handleError<string>('stats')));
    }

    uploadFile(url,body){
      let httpOptions =  {
        headers: new HttpHeaders({
          // 'Content-Type':  'multipart/form-data',
          'x-api-key' : 'trademark',
          'x-api-secret-key' : '469d074a74681db677d64e1e69feb77ae9a5e85ba5dfa690a9efa4ac09959e9b',
          'Authorization': localStorage.getItem('token') ? localStorage.getItem('token') : '',
          'VisitorID' : '',
          'IpAddress' : ''
        }),
        body: body
      }
      return this.http.post(environment.url + url, body, httpOptions).pipe(
        map((data: any) => {
          return data;
        }),
        catchError(this.handleError<string>('stats')));
    }
  
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        // console.error(error);   
        // console.log(`${operation} failed: ${error.message}`);
        this.toggleLoader(false);
        if(error.error.message == "Token is invalid!" || error.error.message == "token invalid" || error.error.message == "Token is missing or user not logged in"){
          this._common.toggleLoggedInMenu(false);
          localStorage.clear();
          this._common.showToastr("error", "Session Expired.");
          this._router.navigateByUrl('/');
        }
        else{
          return throwError(error)
        }
        return of(result as T);
      };
    }
  }
  