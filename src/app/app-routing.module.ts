import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthModule } from './components/auth/auth.module';

const routes: Routes = [
  {
    path : "", redirectTo : "auth", pathMatch : "full"
  },
  { 
    path: '', 
    component : AppComponent,
    children : [
      {
        path : "auth",
        loadChildren : () => AuthModule
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
