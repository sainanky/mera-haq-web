import { Component } from '@angular/core';

@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.scss']
})
export class LeftbarComponent {
  
  menuArr : any = [
    { name : "Dashboard", url : "/app/dashboard", icon : "bi bi-grid" },
    { name : "Category", url : "/app/category", icon : "bi bi-journal-text" },
    { name : "Content", url : "/app/content", icon : "bi bi-layout-text-window-reverse" },
  ];
}
