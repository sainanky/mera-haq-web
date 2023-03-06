import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular-App';

  constructor(private _router : Router){}

  ngOnInit(){
    // if(location.pathname == '/' && localStorage.token != ''){
    //   this._router.navigateByUrl('/app/dashboard');
    // }
  }
}
