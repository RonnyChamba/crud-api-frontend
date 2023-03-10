import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {


  public refresh = new Subject<void>();


  constructor(private router: Router) { }

  public setToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);

    this.refresh.next();
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public isLogged(): boolean {

    return (this.getToken() != undefined && this.getToken() != null);
  }

  private getValuesPayload() : Object{
    const payload =this.getPayload()[1];
    const payloadDecoded = atob(payload);
    const  values = JSON.parse(payloadDecoded);
    return values;
  }

  private getPayload(): string[] {
    return this.getToken().split(".");
  }

  public getUsername(): string {
    if (!this.isLogged()) {
      return null;
    }

    const valuePayloadRuc = this.getValuesPayload()['sub']

    return valuePayloadRuc;
  }

  public isAdmin(): boolean {
    
    if (!this.isLogged()) {
      return false;
    }

    const roles = [...this.getValuesPayload()['authorities']];

    return roles.find(autho => autho.authority =='ROLE_ADMIN')

    // return roles.indexOf("ROLE_ADMIN")>=0;
  }

  public logOut(): void {
    window.localStorage.clear();
    this.router.navigate(['/login']);

    this.refresh.next();

  }
}
