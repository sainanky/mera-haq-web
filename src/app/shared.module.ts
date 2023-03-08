import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SafePipe } from './pipes/safe/safe.pipe';
import { LoadingBarModule } from '@ngx-loading-bar/core';

@NgModule({
  declarations: [
    SafePipe
  ],
  imports: [
    NgbModule, FormsModule, ReactiveFormsModule, HttpClientModule, LoadingBarModule
  ],
  exports : [FormsModule, ReactiveFormsModule, NgbModule, SafePipe, LoadingBarModule]
})
export class SharedModule { }
