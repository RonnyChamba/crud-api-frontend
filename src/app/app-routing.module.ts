import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CategoryComponent } from './category/category.component';
import { MenuComponent } from './menu/menu.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent},
  { path: 'register', component: UserComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'category', component: CategoryComponent},
  { path: '**', redirectTo: 'menu', pathMatch: 'full' },
  // { path: 'login', component: FormularioLoginComponent, canActivate: [guardLogin]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
