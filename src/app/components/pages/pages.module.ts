import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page.component';
import { LayoutModule } from '../layout/layout.module';
import { DasboardComponent } from './dasboard/dasboard.component';

const routes : Routes = [
  {
    path : "",
    redirectTo : "dashboard",
    pathMatch : "full"
  },
  {
    path : "",
    component : PageComponent,
    children : [    
    { path: 'category', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)},
    {
      path : "dashboard",
      component : DasboardComponent
    },
   ]
  }
]

@NgModule({
  declarations: [PageComponent, DasboardComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), LayoutModule
  ]
})
export class PagesModule { }
