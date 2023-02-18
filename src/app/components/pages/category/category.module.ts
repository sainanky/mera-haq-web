import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { RouterModule, Routes } from '@angular/router';

const routes : Routes = [
  {
    path : "",
    pathMatch : "full",
    redirectTo : "list"
  },
  {
    path : "",
    component : CategoryComponent,
    children : [
      {
        path : "list",
        component : ListComponent
      },
      {
        path : "create",
        component : CreateComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    CategoryComponent,
    CreateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CategoryModule { }
