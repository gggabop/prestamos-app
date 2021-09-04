import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { dashboardService } from '../dashboard-service.service';

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.page.html',
  styleUrls: ['./auditoria.page.scss'],
})
export class AuditoriaPage implements OnInit {

  public auditorias;

  constructor(private dbService: dashboardService,
    private rutaActiva: ActivatedRoute,
    private router: Router) {}

    ngOnInit() {
      this.getAuditorias();
    }

    getAuditorias(){
      this.dbService.getAll('audit')
      .subscribe(resp=>{
         this.auditorias = resp.auditorias;
      });}
}
