import { dashboardService } from '../dashboard-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
})
export default class PagosPage implements OnInit, OnDestroy {

  public pagos;

  public rla = this.router.url === '/dashboard/pagos'? false : true;

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
                          this.rla = event.url  === '/dashboard/pagos'? false : true;
                        }
                      });
              }


  ngOnInit() {
    this.getPagos();
  }

  ngOnDestroy() {
    this.event$.unsubscribe();
  }

  getPagos(){
    this.dbSevice.getAll('payments')
    .subscribe(resp=>{
       this.pagos = resp.pagos;
       console.log(resp);
    });

 }
 onClick(){
  this.rla=true;
}
}
