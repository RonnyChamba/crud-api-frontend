import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CredentialUser } from '../models/credential';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = 'http://localhost:8080/api/v1/auth/';

  constructor(private httpClient: HttpClient) { }


   onLogin(loginUsuario: CredentialUser): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'login', loginUsuario);
  }

  // public refresh(dto: JwtDTO): Observable<JwtDTO> {
  //   return this.httpClient.post<JwtDTO>(this.authURL + 'refresh', dto);
  // }

  
}
