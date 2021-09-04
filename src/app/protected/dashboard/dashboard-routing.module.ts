import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children:[
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
