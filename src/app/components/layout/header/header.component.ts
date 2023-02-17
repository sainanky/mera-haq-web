import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  pageName : string = "";

  constructor(private _route : ActivatedRoute, private _router : Router) { 
    // _router.events.subscribe(event => {
    //   if(event instanceof NavigationEnd) {
    //     this.pageName = this.getRouterData(_router.routerState, _router.routerState.root).join('-');
    //   }
    // });
  }

  ngOnInit(): void {}



  logout(){
    localStorage.clear();
    this._router.navigateByUrl('/login');
  }
}
