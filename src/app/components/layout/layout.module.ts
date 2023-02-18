import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LeftbarComponent } from './leftbar/leftbar.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    HeaderComponent,
    LeftbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports : [ HeaderComponent, LeftbarComponent, FooterComponent ]
})
export class LayoutModule { }
