import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)},
  { path: 'dashboard', loadChildren: () => import('./components/pages/pages.module').then(m => m.PagesModule)},
  { path: '',   redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
