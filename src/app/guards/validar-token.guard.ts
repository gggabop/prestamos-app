import { tap } from 'rxjs/operators';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router){}

  canActivate(): Observable<boolean> |  boolean {
    return this.authService.ValidateToken()
    .pipe(
      tap(valid=>{
        if(!valid){
          this.router.navigateByUrl('/');
        }
      })
    );
  }
  canLoad(): Observable<boolean> | boolean {
    return this.authService.ValidateToken()
    .pipe(
      tap(valid=>{
        if(!valid){
          this.router.navigateByUrl('/');
        }
      })
    );
  }
}
