import { dashboardService } from './../dashboard-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export default class UsuariosPage implements OnInit, OnDestroy {

  public usuarios;

  public rla = this.router.url === '/dashboard/usuarios'? false : true;

  event$;

  constructor(private dbService: dashboardService,
               private rutaActiva: ActivatedRoute,
               private router: Router) {
                this.event$=
                router.events
                    .subscribe(
                      (event) => {
                        if(event instanceof NavigationStart) {
                          console.log(event.url);
                          this.rla = event.url  === '/dashboard/usuarios'? false : true;
                        }
                      });
              }


  ngOnInit() {
    this.getUsuarios();
  }

  ngOnDestroy() {
    this.event$.unsubscribe();
  }

  getUsuarios(){
    this.dbService.getAll('users')
    .subscribe(resp=>{
       this.usuarios = resp.usuarios;
    });

 }
 onClick(){
  this.rla=true;
}
}
