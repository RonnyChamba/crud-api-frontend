import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CategoryComponent } from './category/category.component';
import { MenuComponent } from './menu/menu.component';
import { UserComponent } from './user/user.component';
import { LoginGuard as guardLogin } from './auth/guards/login.guard';
import { GuarRutasGuard as guard } from './auth/guards/guar-rutas.guard';

import { GuarRegisterGuard as guardRegister } from './auth/guards/guar-register.guard';

const routes: Routes = [

  { path: 'login', component: LoginComponent, canActivate: [guardLogin]},
  { path: 'register', component: UserComponent, canActivate: [guardRegister]},
  { path: 'menu', component: MenuComponent,  canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  { path: 'category', component: CategoryComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  { path: '**', redirectTo: 'menu', pathMatch: 'full' },
  // { path: 'login', component: FormularioLoginComponent, canActivate: [guardLogin]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
