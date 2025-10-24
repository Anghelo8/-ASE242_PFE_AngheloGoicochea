// src/app/services/venta.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venta } from '../models/venta.model';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private baseUrl = 'http://localhost:8081/api/ventas';

  constructor(private http: HttpClient) {}

  listar(): Observable<Venta[]> {
    return this.http.get<Venta[]>(this.baseUrl);
  }

  crear(venta: Venta): Observable<Venta> {
    return this.http.post<Venta>(this.baseUrl, venta);
  }
}