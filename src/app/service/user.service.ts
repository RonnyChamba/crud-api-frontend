import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO, UserResponse } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlBase: string = "http://localhost:8080/api/v1/auth";

  constructor(private httpClient: HttpClient) { }


  saveUser(userDTO:UserDTO): Observable<UserResponse>{

     return this.httpClient.post<UserResponse>(`${this.urlBase}/users`, userDTO);

  }
}
