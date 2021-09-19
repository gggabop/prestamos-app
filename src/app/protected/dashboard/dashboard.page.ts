import { AuthService } from './../../auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {

  get usuario(){
    return this.authService.user;
  }

  public appPages = [];


  constructor(private router: Router,
    private authService: AuthService,
    private menu: MenuController) { }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  ngOnInit() {
    this.appPages = [];
    this.authService.nivel()
    .subscribe(resp=>{
      console.log(resp,'00000000000000000000000000000');
      const usuario = resp.user.level;
      switch (usuario) {
        case 'admin':
          this.appPages = [
            { title: 'Inicio', url: '/dashboard/inicio/', icon: 'home' },
            { title: 'Clientes', url: '/dashboard/clientes/', icon: 'people' },
            { title: 'Pedidos', url: '/dashboard/pedidos', icon: 'git-pull-request' },
            { title: 'Prestamos', url: '/dashboard/prestamos', icon: 'ticket' },
            { title: 'Pagos', url: '/dashboard/pagos', icon: 'cash' },
            { title: 'Agenda', url: '/dashboard/agenda', icon: 'calendar' },
            { title: 'Usuarios', url: '/dashboard/usuarios', icon: 'people' },
            { title: 'Auditoria', url: '/dashboard/auditoria', icon: 'footsteps' },
          ];
          break;
        case 'prestamista':
          this.appPages = [
            { title: 'Inicio', url: '/dashboard/inicio/', icon: 'home' },
            { title: 'Clientes', url: '/dashboard/clientes/', icon: 'people' },
            { title: 'Pedidos', url: '/dashboard/pedidos', icon: 'git-pull-request' },
            { title: 'Prestamos', url: '/dashboard/prestamos', icon: 'ticket' },
            { title: 'Pagos', url: '/dashboard/pagos', icon: 'cash' },
            { title: 'Agenda', url: '/dashboard/agenda', icon: 'calendar' },
          ];
          break;
        case 'secretaria' :
          this.appPages = [
            { title: 'Inicio', url: '/dashboard/inicio/', icon: 'home' },
            { title: 'Clientes', url: '/dashboard/clientes/', icon: 'people' },
            { title: 'Pedidos', url: '/dashboard/pedidos', icon: 'git-pull-request' },
            { title: 'Pagos', url: '/dashboard/pagos', icon: 'cash' },
          ];
          break;
        default:
          break;
      }
    });
  }
  ngOnDestroy(){
    console.log();
    this.appPages = [];
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['']);
  }

}


