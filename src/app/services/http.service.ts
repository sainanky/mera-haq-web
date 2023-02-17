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
    get(url:string){
      const token:any = localStorage.getItem('admin_token') 
      let httpOptions =  {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'app-origin' : window.location.origin,
          'Authorization': token,
          'VisitorID' : '',
          'IpAddress' : ''
        }) as any
      }
      this.toggleLoader(true);
      return this.http.get(environment.url + url, httpOptions).pipe(
        map((data: any) => {
          this.toggleLoader(false);
          return data;
        }),
        catchError(this.handleError<string>('stats')));
    }

    get_no_url(url:string){
      let httpOptions =  {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'app-origin' : window.location.origin,
          'Authorization': '',
          'VisitorID' : '',
          'IpAddress' : ''
        })
      }
      this.toggleLoader(true);
      return this.http.get(url, httpOptions).pipe(
        map((data: any) => {
          this.toggleLoader(false);
          return data;
        }),
        catchError(this.handleError<string>('stats')));
    }
  
    /**
     * post function to call http post request.
     */
    post(url:string, body:any):any{
      let httpOptions =  {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'app-origin' : window.location.origin,
          'Authorization': '',
          'VisitorID' : '',
          'IpAddress' : ''
        })
      }
      this.toggleLoader(true);
      return this.http.post(environment.url + url, body, httpOptions).pipe(
        map((data: any) => {
          this.toggleLoader(false);
          return data;
        }),
        catchError(this.handleError<string>('stats')));
    }

  
  
    /**
     * post function to call http post request.
     */
   

  
    /**
     * get function to call http delete request.
     */
    delete(url:any,body:any){
      let httpOptions =  {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'app-origin' : window.location.origin,
          'Authorization': '',
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
  