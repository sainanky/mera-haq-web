import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from './dashboard/dashboard.module';
import { LayoutModule } from '../layout/layout.module';

const routes : Routes = [
  {
    path : "",
    redirectTo : "dashboard",
    pathMatch : "full"
  },
  {
    path : "",
    component : PagesComponent,
    children : [
      {
        path : "dashboard", loadChildren : () => DashboardModule
      }
    ]
  }
];

@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule, 
    LayoutModule,
    RouterModule.forChild(routes)
  ]
})
export class PagesModule { }
