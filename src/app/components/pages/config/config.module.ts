import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from '../../layout/layout.module';
import { SharedModule } from 'src/app/shared.module';
import { HttpService } from 'src/app/services/http.service';
import { CommonService } from 'src/app/services/common.service';
import { ContentService } from 'src/app/services/content/content.service';
import { ConfigService } from 'src/app/services/config/config.service';

const routes : Routes = [
  {
    path : "",
    component : ConfigComponent
  }
];

@NgModule({
  declarations: [
    ConfigComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    SharedModule
  ],
  providers : [
    HttpService,
    CommonService,
    ContentService,
    ConfigService
  ]
})
export class ConfigModule { }
