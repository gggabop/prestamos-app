import { dashboardService } from '../dashboard-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.page.html',
  styleUrls: ['./prestamos.page.scss'],
})
export default class PrestamosPage implements OnInit, OnDestroy {

  public prestamos;

  public rla = this.router.url === '/dashboard/prestamos'? false : true;

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
                          this.rla = event.url  === '/dashboard/prestamos'? false : true;
                        }
                      });
              }


  ngOnInit() {
    this.getPrestamos();
  }

  ngOnDestroy() {
    this.event$.unsubscribe();
  }

  getPrestamos(){
    this.dbService.getAll('loans')
    .subscribe(resp=>{
       this.prestamos = resp.prestamos;
       console.log('prestamos', this.prestamos);
    });

 }
 onClick(){
  this.rla=true;
}
}
