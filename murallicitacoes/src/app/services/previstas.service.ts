import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrevistasService {

  private baseUrl = `${environment.BASE_URL}`;

  constructor(private http: HttpClient) { }

  getLicitacoesPrevistas(filtros: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/licitacoes-pendentes`, filtros);
  }
}
