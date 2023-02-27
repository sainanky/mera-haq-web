import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from '../../layout/layout.module';
import { SharedModule } from 'src/app/shared.module';
import { HttpService } from 'src/app/services/http.service';
import { CommonService } from 'src/app/services/common.service';
import { UsersService } from 'src/app/services/users/users.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ViewComponent } from './view/view.component';

const routes : Routes = [
  {
    path : "",
    redirectTo : "list",
    pathMatch : "full"
  },
  {
    path : "",
    component : UsersComponent,
    children : [
      { path : "list", component : ListComponent },
      { path : "create", component : CreateComponent },
      { path : "view", component : ViewComponent },
    ]
  }
];

@NgModule({
  declarations: [
    UsersComponent,
    ListComponent,
    CreateComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    SharedModule,
    NgxDatatableModule
  ],
  providers : [ HttpService, CommonService, UsersService ]
})
export class UsersModule { }
