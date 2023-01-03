import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  urlBase = 'http://localhost:8080/api/v1/categories';

  constructor(private httpClient: HttpClient) { }


  findlAllCategory(): Observable<any>{

    return this.httpClient.get<any>(`${this.urlBase}`);


  }
}
