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
    _router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.pageName = this.getRouterData(_router.routerState, _router.routerState.root).join('-');
      }
    });
  }

  ngOnInit(): void {}
  getRouterData(state:any, parent:any):any {
    var data = [];
    if(parent && parent.snapshot.data && parent.snapshot.data.name) {
      data.push(parent.snapshot.data.name);
    }

    if(state && parent) {
      data.push(... this.getRouterData(state, state.firstChild(parent)));
    }
    return data;
  }


  logout(){
    localStorage.clear();
    this._router.navigateByUrl('/login');
  }
}
