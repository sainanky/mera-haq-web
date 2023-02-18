import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthModule } from './components/auth/auth.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PagesModule } from './components/pages/pages.module';
import { AuthGuard } from './services/auth.guard';

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
      },
      {
        path : "app",
        loadChildren : () => PagesModule,
        canActivate : [AuthGuard]
      },
      {
        path : "**",
        component : PageNotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
