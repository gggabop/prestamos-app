import { PutPagoComponent } from './put-pago/put-pago.component';
import { AddPagoComponent } from './add-pago/add-pago.component';
import { ShowPagoComponent } from './show-pago/show-pago.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import PagosPage from './pagos.page';

const routes: Routes = [
  {
    path: '',
    component: PagosPage,
    children: [
      {
        path:'show/:id',
        component: ShowPagoComponent
      },
      {
        path:'add',
        component: AddPagoComponent
      },
      {
        path:'put/:id',
        component: PutPagoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagosPageRoutingModule {}
