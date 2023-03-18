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
    { name : "States", url : "/app/states", icon : "bi bi-house" },
    { name : "Exams", url : "/app/exams", icon : "bi bi-newspaper" },
    { name : "Content", url : "/app/content", icon : "bi bi-layout-text-window-reverse" },
    { name : "Users", url : "/app/users", icon : "bi bi-people" },
    { name : "Config", url : "/app/config", icon : "bi bi-wrench-adjustable" },
  ];
}
