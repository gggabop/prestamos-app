import { PutPedidoComponent } from './put-pedido/put-pedido.component';
import { AddPedidoComponent } from './add-pedido/add-pedido.component';
import { ShowPedidoComponent } from './show-pedido/show-pedido.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import PedidosPage from './pedidos.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosPage,
    children: [
      {
        path:'show/:id',
        component: ShowPedidoComponent
      },
      {
        path:'add',
        component: AddPedidoComponent
      },
      {
        path:'put/:id',
        component: PutPedidoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosPageRoutingModule {}
