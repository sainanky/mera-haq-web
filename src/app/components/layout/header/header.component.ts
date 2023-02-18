import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isMenuToggled : boolean = false;

  toggleSiderbar(){
    this.isMenuToggled = !this.isMenuToggled;
    let el = document.getElementsByTagName('body')[0];
    if(this.isMenuToggled) el.classList.add('toggle-sidebar');
    else el.classList.remove('toggle-sidebar');
  }
}
