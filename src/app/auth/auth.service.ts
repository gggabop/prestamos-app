import { Observable } from 'rxjs';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import { auth, Usuario } from './interfaces/interfaceAuth';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _user: Usuario;

  get user(){
    return {...this._user };
  }

  constructor(private http: HttpClient) { }

  login(email: string, password: string){

    const url = `${ this.baseUrl }/login`;
    const body =  { email, password };

    return this.http.post<auth>(url, body)
    .pipe(
      tap( resp => {
        if (resp.message) {
          localStorage.setItem('access_token',resp.access_token);
        }
      }),
      map( resp => resp.message),
      catchError( error => of(false))
    );
  }

  ValidateToken(): Observable<boolean>{
    const url = `${this.baseUrl}/check`;
    const headers = new HttpHeaders()
    .set('Authorization','Bearer '+localStorage.getItem('access_token')||'');
    return this.http.get<auth>(url, {headers})
    .pipe(
      map( resp => {
        this._user = {
          name: resp.user.name,
          email: resp.user.email,
          level: resp.user.level
        };
        return resp.message==='ok' ? true : false;
      }),
      catchError(err => of(false))
    );
  }
  nivel(): any{
    const url = `${this.baseUrl}/check`;
    const headers = new HttpHeaders()
    .set('Authorization','Bearer '+localStorage.getItem('access_token')||'');
    return this.http.get<auth>(url, {headers})
    .pipe(
      tap(resp=>{
        if(resp){
          return resp;
        }
      })
    );
  }

  logout(){
    localStorage.removeItem('access_token');
    setTimeout(() => {
          window.location.reload();
          }, 2000);
  }

}
