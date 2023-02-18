import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
declare var fpPromise : any;
declare var $ : any;

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

  showToastr(type, message) {
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

  dateToString(values){
    if(values.month < 10) values.month = '0' + parseInt(values.month);
    if(values.day < 10) values.day = '0' + parseInt(values.day);
    return values.year + '-' + values.month + '-' + values.day;
  }

  dateToLocaleString(values){
    if(values.month < 10) values.month = '0' + parseInt(values.month);
    if(values.day < 10) values.day = '0' + parseInt(values.day);
    return values.day + '/' + values.month + '/' + values.year;
  }

  regex(type){
    if(type == "mobile") return /(7|8|9)\d{9}/;
    else if(type == "zipcode") return /^\d{6}$/;
    else if(type == "url") return /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    else if(type == "integer") return /^[0-9.]+$/;
    else if(type == "email") return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
    else if(type == "hashtag") return /(^|\s)(#[a-z\d-]+)/;
    else if(type == "gst") return /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;
    else if(type == "pan") return /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
  }

  replaceHyphen(str){
    return str.replaceAll("-", " ");
  }

  formatInvoiceNumber(invNo){
    let currYear = moment().format('yy');
    let currMonth = moment().format('MM');

    let nInvNo = invNo.split('/');
    let invIndex = Number(nInvNo[1]);
    let invYearMonth = nInvNo[0].split('-');
    let invYear = invYearMonth[0];
    let invMonth = invYearMonth[1];
    let newInvNumber = '';
    
    if(currYear > invYear) newInvNumber = `${currYear}-${currMonth}/${this.generateInvoiceNumber(1)}`;
    else if(currMonth > invMonth) newInvNumber = `${currYear}-${currMonth}/${this.generateInvoiceNumber(1)}`;
    else newInvNumber = `${currYear}-${currMonth}/${this.generateInvoiceNumber(invIndex + 1)}`;
    return newInvNumber;
  }

  generateInvoiceNumber(number){
    let length = number.toString().length;
    let totalLen = 4 - length;
    for(let i = 0; i < totalLen; i++){
      number = '0' + number;
    }
    return number;
  }

  getOriginName(){
    let isFinanvo = true;
    if(window.location.hostname == "web.compdata.in") isFinanvo = false;
    return isFinanvo;
  }
  
  formatUrlName(name){
    return name.split(' ').join('-');
  }

  getVisitorId(){
    return new Promise((resolve, reject)=>{
      fpPromise
      .then(fp => fp.get())
      .then(result => {
        localStorage.setItem('visitorId', result.visitorId);
        resolve(result.visitorId);
      });
    });
  }

  setClientDetails(){
    return new Promise((resolve, reject)=>{
      $.get('https://www.cloudflare.com/cdn-cgi/trace', function(data) {
        data = data.trim().split('\n').reduce(function(obj, pair) {
          pair = pair.split('=');
          return obj[pair[0]] = pair[1], obj;
        }, {});
        console.log(data);
        if(data){
          localStorage.setItem('ipAddress', data.ip);
          resolve(true);
        }
      });
    })
  }

  getDefaultDate(){
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1);
    return moment(yesterday).format('yyyy-MM-DD');
  }

  copyToClipboard(item){
    item = JSON.stringify(item);
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (item));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
    this.showToastr("success", "Copied to clipboard...");
  }

  financialYear(){
    let yearsLength = 20;
    let yearArr = [];
    let currentYear = new Date().getFullYear();
    for(let i = 0; i < yearsLength; i++){
      let next = currentYear+1;
      let year = currentYear + '-' + next.toString().slice(-2);
      yearArr.push({
        name : year,
        value : currentYear
      })
      currentYear--;
    }
    return yearArr;
  }
}
