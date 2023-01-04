import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { CategoryDTO } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  urlBase = 'http://localhost:8080/api/v1/categories';

  public refresh = new Subject<void>();

  constructor(private httpClient: HttpClient) { }

  findlAllCategory(): Observable<any>{

    return this.httpClient.get<any>(`${this.urlBase}`);

  }

  findlFetchBookAllCategory(): Observable<any>{

    return this.httpClient.get<any>(`${this.urlBase}/books`);

  }

  saveCategory(categoryDTO : CategoryDTO): Observable<any> {

    return this.httpClient.post<any>(`${this.urlBase}`, categoryDTO)
    .pipe(
      tap( () =>{

        this.refresh.next();
      })
    );

  }

  deleteCategory(ide: number): Observable<any> {

    return this.httpClient.delete<any>(`${this.urlBase}/${ide}`)
    .pipe(
      tap( () =>{

        this.refresh.next();
      })
    );
  }


  findCategoryByIde(ide: number): Observable<CategoryDTO> {

    return this.httpClient.get<CategoryDTO>(`${this.urlBase}/${ide}`);

  }

  updateCategory(ide: number, categoryDTO:CategoryDTO): Observable<CategoryDTO> {
    
    return this.httpClient.put<CategoryDTO>(`${this.urlBase}/${ide}`, categoryDTO)
    .pipe(

      tap( ()=>{
        this.refresh.next();
      })
    );

  }


}
