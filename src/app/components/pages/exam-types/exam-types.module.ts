import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamTypesComponent } from './exam-types.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';
import { LayoutModule } from '../../layout/layout.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpService } from 'src/app/services/http.service';
import { CommonService } from 'src/app/services/common.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { ContentService } from 'src/app/services/content/content.service';

const routes : Routes = [
  {
    path : "",
    pathMatch : "full",
    redirectTo : "list"
  },
  {
    path : "",
    component : ExamTypesComponent,
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
]

@NgModule({
  declarations: [
    ExamTypesComponent,
    ListComponent, 
    CreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    LayoutModule,
    NgxDatatableModule
  ],
  providers : [HttpService, CommonService, ConfigService, ContentService]
})
export class ExamTypesModule { }
