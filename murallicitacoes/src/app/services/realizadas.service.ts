import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ListaLicitacoesRealizadas } from '../models/lista.licitacoes-realizadas';

@Injectable({
  providedIn: 'root'
})
export class RealizadasService {

  private baseUrl = `${environment.BASE_URL}`;

  constructor(private http: HttpClient) { }

  getLicitacoesRealizadas(filtros: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/licitacoes-realizadas`, filtros);
  }
}
