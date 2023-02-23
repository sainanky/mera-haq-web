import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from '../../layout/layout.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpService } from 'src/app/services/http.service';
import { CommonService } from 'src/app/services/common.service';
import { ContentService } from 'src/app/services/content/content.service';
import { AngularEditorModule } from '@kolkov/angular-editor';

const routes : Routes = [
  { path : "", redirectTo : "list", pathMatch : "full" },
  { 
    path : "",
    component : ContentComponent,
    children : [
      { path : "list", component : ListComponent },
      { path : "create", component : CreateComponent },
    ]
  }
];

@NgModule({
  declarations: [
    ContentComponent,
    CreateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    NgxDatatableModule,
    AngularEditorModule
  ],
  providers : [ HttpService, CommonService, ContentService ]
})
export class ContentModule { }