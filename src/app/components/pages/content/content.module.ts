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
import { CategoryService } from 'src/app/services/category/category.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from 'src/app/pipes/safe/safe.pipe';
import { SharedModule } from 'src/app/shared.module';
import { ConfigService } from 'src/app/services/config/config.service';
import { NgxEditorModule } from 'ngx-editor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    AngularEditorModule,
    SharedModule,
    NgxEditorModule,
    NgbModule
  ],
  providers : [ HttpService, CommonService, ContentService, ConfigService, CategoryService ]
})
export class ContentModule { }
