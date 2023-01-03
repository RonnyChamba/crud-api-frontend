import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { BookDTO } from '../models/book';
import { BookResponseDto } from '../models/dto-response/book-response-dto';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  urlBase = 'http://localhost:8080/api/v1/books';

  public refresh = new Subject<void>();

  constructor(private httpClient: HttpClient) { }

  findAllBook(): Observable<any> {

    return this.httpClient.get<any>(`${this.urlBase}`);

  }

  saveBook(bookDTO:BookDTO) : Observable<BookResponseDto> {

    return this.httpClient.post<BookResponseDto>(`${this.urlBase}`, bookDTO)
    .pipe(
      tap(() => {

        this.refresh.next();
      })
    );
  }

  deleteBook(ide: number): Observable<void>{

    return this.httpClient.delete<void>(`${this.urlBase}/${ide}`)
    .pipe(
      tap ( () =>{

        this.refresh.next();
      })
    )

  }

  findBookByIde(ide:number): Observable<BookDTO>{
    return this.httpClient.get<BookDTO>(`${this.urlBase}/${ide}`);
  }


  updateBook(ide:number, bookDTO: BookDTO): Observable<BookResponseDto>{
    return this.httpClient.put<BookResponseDto>(`${this.urlBase}/${ide}`, bookDTO)
    .pipe(
      tap(()=>{
        this.refresh.next();
      } )
    );
  }
}
