import { dashboardService } from '../dashboard-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export default class AgendaPage implements OnInit, OnDestroy {

  public notas;

  public rla = this.router.url === '/dashboard/agenda'? false : true;

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
                          this.rla = event.url  === '/dashboard/agenda'? false : true;
                        }
                      });
              }


  ngOnInit() {
    this.getNotas();
  }

  ngOnDestroy() {
    this.event$.unsubscribe();
  }

  getNotas(){
    this.dbSevice.getAll('diary')
    .subscribe(resp=>{
       this.notas = resp.notas;
       console.log(resp);
    });

 }
 onClick(){
  this.rla=true;
}
}
