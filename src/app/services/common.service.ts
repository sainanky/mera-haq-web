import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private toastr: ToastrService) { }

  private loggedInUserSource = new BehaviorSubject(false);
  currentLoggedInUserSource = this.loggedInUserSource.asObservable();

  private isSubMenuPageSource = new BehaviorSubject('');
  currentisSubMenuPageSource = this.isSubMenuPageSource.asObservable();

  toggleLoggedInMenu(status: boolean) {
    this.loggedInUserSource.next(status)
  }

  toggleSubMenuPage(status: string) {
    this.isSubMenuPageSource.next(status)
  }

  showToastr(type:string, message:string) {
    if(type == 'show'){
      this.toastr.show(message, undefined, {
        closeButton: true,
        positionClass: 'toast-top-right'
      });
    }
    else if(type == 'success'){
      this.toastr.success(message, undefined, {
        closeButton: true,
        positionClass: 'toast-top-right'
      });
    }
    else if(type == 'error'){
      this.toastr.error(message, undefined, {
        closeButton: true,
        positionClass: 'toast-top-right'
      });
    }
    else if(type == 'warning'){
      this.toastr.warning(message, undefined, {
        closeButton: true,
        positionClass: 'toast-top-right'
      });
    }
    else if(type == 'info'){
      this.toastr.info(message, undefined, {
        closeButton: true,
        positionClass: 'toast-top-right'
      });
    }
  }


 
  getOriginName(){
    let isFinanvo = true;
    if(window.location.hostname == "web.compdata.in") isFinanvo = false;
    return isFinanvo;
  }
  
}
