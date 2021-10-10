import { AuthService } from './../../auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
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

  event$;
  component;
  constructor(private router: Router,
    private authService: AuthService,
    private menu: MenuController) {
      this.appPages = [];
      this.component = this.router.url.split('/')[2];
      this.event$=
                router.events
                    .subscribe(
                      (event) => {
                        if(event instanceof NavigationStart) {
                          console.log(event.url);
                          this.component = event.url.split('/')[2];
                        }
                      });
    }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.enable(true, 'end');
    this.menu.toggle();
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
  verifica() {
    this.authService.nivel().
      subscribe(arg => console.log('aaaa',arg));
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
            { title: 'Préstamos', url: '/dashboard/prestamos', icon: 'ticket' },
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
            { title: 'Préstamos', url: '/dashboard/prestamos', icon: 'ticket' },
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


