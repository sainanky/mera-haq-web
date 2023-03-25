import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from '../../layout/layout.module';
import { HttpService } from 'src/app/services/http.service';
import { CommonService } from 'src/app/services/common.service';
import { ConfigService } from 'src/app/services/config/config.service';

const routes : Routes = [
  {
    path : "",
    component : DashboardComponent
  }
]

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule.forChild(routes)
  ],
  providers : [HttpService, CommonService, ConfigService]
})
export class DashboardModule { }
