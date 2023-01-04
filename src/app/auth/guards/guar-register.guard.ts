import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class GuarRegisterGuard implements CanActivate {
  constructor(private tokenService: TokenService,
    private router: Router){}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.tokenService.isLogged() && !this.tokenService.isAdmin() ) {
      this.router.navigate(['/menu']);
      return false;
    }

    return true;
  }
  
}
