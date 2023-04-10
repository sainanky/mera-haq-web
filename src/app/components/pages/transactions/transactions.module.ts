import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsComponent } from './transactions.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';
import { LayoutModule } from '../../layout/layout.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpService } from 'src/app/services/http.service';
import { CommonService } from 'src/app/services/common.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes : Routes = [
  {
    path : "",
    component : TransactionsComponent
  }
]

@NgModule({
  declarations: [
    TransactionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    LayoutModule,
    NgxDatatableModule,
    NgbModule
  ],
  providers : [
    HttpService,
    CommonService,
    ConfigService
  ]
})
export class TransactionsModule { }
