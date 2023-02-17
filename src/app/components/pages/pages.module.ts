import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page.component';
import { LayoutModule } from '../layout/layout.module';

const routes : Routes = [
  {
    path : "",
    redirectTo : "welcome",
    pathMatch : "full"
  },
  {
    path : "",
    component : PageComponent,
    children : [
    
      
      { path: 'category', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)},
    

      
    ]
  }
]

@NgModule({
  declarations: [PageComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), LayoutModule
  ]
})
export class PagesModule { }
