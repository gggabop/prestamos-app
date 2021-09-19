import { PutPrestamoComponent } from './put-prestamo/put-prestamo.component';
import { AddPrestamoComponent } from './add-prestamo/add-prestamo.component';
import { ShowPrestamoComponent } from './show-prestamo/show-prestamo.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import PrestamosPage from './prestamos.page';

const routes: Routes = [
  {
    path: '',
    component: PrestamosPage,
    children: [
      {
        path:'show/:id',
        component: ShowPrestamoComponent
      },
      {
        path:'add',
        component: AddPrestamoComponent
      },
      {
        path:'put/:id',
        component: PutPrestamoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesPageRoutingModule {}
