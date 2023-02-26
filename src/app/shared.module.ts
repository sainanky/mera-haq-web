import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SafePipe } from './pipes/safe/safe.pipe';

@NgModule({
  declarations: [
    SafePipe
  ],
  imports: [
    NgbModule, FormsModule, ReactiveFormsModule, HttpClientModule
  ],
  exports : [FormsModule, ReactiveFormsModule, NgbModule, SafePipe]
})
export class SharedModule { }
