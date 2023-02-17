import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LeftbarComponent } from './leftbar/leftbar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, LeftbarComponent],
  imports: [
    CommonModule, RouterModule
  ],
  exports : [HeaderComponent, FooterComponent, LeftbarComponent],
})
export class LayoutModule { }
