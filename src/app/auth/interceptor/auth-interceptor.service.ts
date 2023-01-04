import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';

const AUTHORIZATION = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {



    if (!this.tokenService.isLogged()) {
      return next.handle(req);
    }

    let intReq = req;
    const token = this.tokenService.getToken();

    intReq = this.addToken(req, token);

    return next.handle(intReq).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 401) { // para refrescar el token si se desea implementar
        // const dto: JwtDTO = new JwtDTO(this.tokenService.getToken());
        // return this.authService.refresh(dto).pipe(concatMap((data: any) => {
        //   console.log('refreshing....');
        //   this.tokenService.setToken(data.token);
        //   intReq = this.addToken(req, data.token);
        //   return next.handle(intReq);
        // }));

        alert("Su sesión ha finalizado, vuelva iniciar sesión");
        this.tokenService.logOut();
      } 
      else {
        
        /**
         * Estos dos lineas comentadas es para manejar los errores  generales
         */
        // this.tokenService.logOut();
        // return throwError(err);


        // Dejo que la peticion pase
        
      }
      return next.handle(intReq);
    }));
  
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ headers: req.headers.set(AUTHORIZATION, 'Bearer ' + token) });
  }
}

export const interceptorProvider = [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }];