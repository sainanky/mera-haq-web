import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { HttpService } from 'src/app/services/http.service';
import { CommonService } from 'src/app/services/common.service';
import { DataService } from 'src/app/services/data.service';


const routes : Routes = [
  {
    path : "",
    redirectTo : "list",
    pathMatch : "full"
  },
  {
    path : "",
    component : CategoryComponent,
    children : [
      {
        path : "create",
        component : CreateCategoryComponent
      },
      {
        path : "list",
        component : CategoryListComponent
      },
    ]
  }
]

@NgModule({
  declarations: [CategoryComponent, CreateCategoryComponent, CategoryListComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  providers : [HttpService, CommonService, DataService]
})
export class CategoryModule { }
