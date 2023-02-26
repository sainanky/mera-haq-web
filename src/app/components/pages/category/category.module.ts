import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from '../../layout/layout.module';
import { HttpService } from 'src/app/services/http.service';
import { CommonService } from 'src/app/services/common.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from 'src/app/shared.module';

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
    LayoutModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    SharedModule
  ],
  providers : [
    HttpService,
    CommonService,
    CategoryService
  ]
})
export class CategoryModule { }
