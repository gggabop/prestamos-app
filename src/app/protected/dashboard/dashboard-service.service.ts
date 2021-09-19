import { Cliente, ClienteElement, Clientes } from './interfaces/clienteInterface';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class dashboardService {

  private baseUrl: string = environment.baseUrl;
  private _clientes;
  private _cliente;

  get Cliente(){
    return {...this._cliente};
  }
  get Clientes(){
    return {...this._clientes};
  }

  constructor(private http: HttpClient) { }

  getAll(ruta){
    const url = `${this.baseUrl}/${ruta}`;
    const headers = new HttpHeaders()
    .set('Authorization','Bearer '+localStorage.getItem('access_token')||'');
    return this.http.get<any>(url, {headers}).pipe(
      tap(resp=>{
        if (resp) {
          return resp;
          }
        }
      )
    );
  }

  get(id,ruta){
    const url = `${this.baseUrl}/${ruta}/${id}`;
    const headers = new HttpHeaders()
    .set('Authorization','Bearer '+localStorage.getItem('access_token')||'');
    return this.http.get<any>(url, {headers}).pipe(
      tap(resp=>{
        if (resp) {
          return resp;
          }
        }
      )
    );
  }
  add(body,ruta){
    const url = `${this.baseUrl}/${ruta}`;
    const headers = new HttpHeaders()
    .set('Authorization','Bearer '+localStorage.getItem('access_token')||'');
    return this.http.post<any>(url, body, {headers}).pipe(
      tap(resp=>{
        if(resp){
          return resp;
        }
      })
    );
  }
  put(body,ruta,id){
    const url = `${this.baseUrl}/${ruta}/${id}`;
    const headers = new HttpHeaders()
    .set('Authorization','Bearer '+localStorage.getItem('access_token')||'');
    return this.http.put<any>(url, body, {headers}).pipe(
      tap(resp=>{
        if(resp){
          return resp;
        }
      })
    );
  }
  delete(id,ruta){
    const url = `${this.baseUrl}/${ruta}/${id}`;
    const headers = new HttpHeaders()
    .set('Authorization','Bearer '+localStorage.getItem('access_token')||'');
    return this.http.delete<any>(url, {headers}).pipe(
      tap(resp=>{
        if(resp){
          return resp;
        }
      })
    );
  }
  addPrestamo(id,ruta){
    const url = `${this.baseUrl}/${ruta}/${id}`;
    const headers = new HttpHeaders()
    .set('Authorization','Bearer '+localStorage.getItem('access_token')||'');
    return this.http.get<any>(url, {headers}).pipe(
      tap(resp=>{
        if(resp){
          return resp;
        }
      })
    );
  }
}
