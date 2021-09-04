import { dashboardService } from './../dashboard-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export default class PedidosPage implements OnInit, OnDestroy {

  public pedidos;

  public rla = this.router.url === '/dashboard/pedidos'? false : true;

  event$;

  constructor(private dbSevice: dashboardService,
               private rutaActiva: ActivatedRoute,
               private router: Router) {
                this.event$=
                router.events
                    .subscribe(
                      (event) => {
                        if(event instanceof NavigationStart) {
                          console.log(event.url);
                          this.rla = event.url  === '/dashboard/pedidos'? false : true;
                        }
                      });
              }


  ngOnInit() {
    this.getPedidos();
  }

  ngOnDestroy() {
    this.event$.unsubscribe();
  }

  getPedidos(){
    this.dbSevice.getAll('cashorder')
    .subscribe(resp=>{
       this.pedidos = resp.pedidos;
       console.log(resp);
    });

 }
 onClick(){
  this.rla=true;
}
}
