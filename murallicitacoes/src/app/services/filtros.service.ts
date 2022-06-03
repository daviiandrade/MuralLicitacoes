import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filtros } from '../models/filtros.model';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {

  private baseUrl = `${environment.BASE_URL}`;

  constructor(private http: HttpClient) { }

  getFiltros(): Observable<Filtros> {
    return this.http.get<Filtros>(`${this.baseUrl}/filtros`);
  }
}
