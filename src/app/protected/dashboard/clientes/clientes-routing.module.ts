import { PutClienteComponent } from './put-cliente/put-cliente.component';
import { AddClienteComponent } from './add-cliente/add-cliente.component';
import { ShowClienteComponent } from './show-cliente/show-cliente.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import ClientesPage from './clientes.page';

const routes: Routes = [
  {
    path: '',
    component: ClientesPage,
    children: [
      {
        path:'show/:id',
        component: ShowClienteComponent
      },
      {
        path:'add',
        component: AddClienteComponent
      },
      {
        path:'put/:id',
        component: PutClienteComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesPageRoutingModule {}
