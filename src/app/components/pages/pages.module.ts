import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from './dashboard/dashboard.module';
import { LayoutModule } from '../layout/layout.module';
import { CategoryModule } from './category/category.module';
import { ContentModule } from './content/content.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';

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
      { path : "dashboard", loadChildren : () => DashboardModule },
      { path : "category", loadChildren : () => CategoryModule },
      { path : "content", loadChildren : () => ContentModule },
      { path : "users", loadChildren : () => UsersModule },
      { path : "config", loadChildren : () => ConfigModule },
      { path : "config", loadChildren : () => ConfigModule },
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
