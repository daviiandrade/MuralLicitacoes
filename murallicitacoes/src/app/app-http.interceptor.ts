import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerService } from './services/spinner.service';

@Injectable()
export class appHttpInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    var params = {filterJurisdicionado:null,filterEnte:3,filterModalidadeLicitacao:null,filterObjetoLicitacao:null,filterDataLeft:null,filterDataRight:null,filterDias:null};

    const req = request.clone({
      headers: request.headers.set('dados', params.toString())
      // setHeaders: 'dados', params
    });
    return next.handle(req);
  }
}
