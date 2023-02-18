import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { CommonService } from './common.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private _common : CommonService, private _auth : AuthService) {}

  // authentication to check routing activation
  // async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   try{
  //     let status = false;
  //     if (localStorage.getItem('admin_token')) {
  //       let resp = await this._user.getTokenStatus();
  //       return resp;
  //     } 
  //     else {
  //       this._common.showToastr("error", "Please login to proceed further");
  //       this.router.navigate(['/login']);
  //     }
  //     return status;
  //   }
  //   catch(err){
  //     this._common.showToastr("error", "Please login to proceed further");
  //     this.router.navigate(['/login']);
  //   }
    
  // }

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean>|boolean {
    return this._auth.verifyToken().pipe(
      map(res => {
        let data = res['data'];
        if(data) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
