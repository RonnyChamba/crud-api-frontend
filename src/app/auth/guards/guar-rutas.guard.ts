import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class GuarRutasGuard implements CanActivate {
  realRol: string;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRol = route.data["expectedRol"];

    // Verificar si hay token
    if (!this.tokenService.isLogged()){
       this.router.navigate(['/login']);
      // // console.log("dentro del aqui")
      return false;  
    }


    this.realRol =  this.tokenService.isAdmin()? 'admin':'user';
    this
    if (!this.tokenService.isLogged() || expectedRol.indexOf(this.realRol) === -1) {
      this.router.navigate(['/menu']);
      return false;
    }
    return true;
  }
  
}
