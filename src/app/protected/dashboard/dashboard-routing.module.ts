import { InicioComponent } from './Inicio/inicio.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children:[
      {
        path: 'inicio',
        component: InicioComponent,
      },
      {
        path: 'clientes',
        loadChildren: () => import('./clientes/clientes.module').then( m => m.ClientesPageModule)
      },
      {
        path: 'pedidos',
        loadChildren: () => import('./pedidos/pedidos.module').then(m => m.PedidosPageModule)
      },
      {
        path: 'auditoria',
        loadChildren: () => import('./auditoria/auditoria.module').then( m => m.AuditoriaPageModule)
      },
      {
        path: 'prestamos',
        loadChildren: () => import('./prestamos/prestamos.module').then(m => m.PretamosPageModule)
      },
      {
        path: 'pagos',
        loadChildren: () => import('./pagos/pagos.module').then(m => m.PagosPageModule)
      },
      {
        path: 'agenda',
        loadChildren: () => import('./agenda/agenda.module').then(m => m.AgendaPageModule)
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuriosPageModule)
      },
      {
        path: '**',
        redirectTo: 'inicio'
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
