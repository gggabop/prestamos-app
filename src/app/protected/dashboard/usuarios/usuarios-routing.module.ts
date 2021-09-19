import { PutUsuarioComponent } from './put-usuario/put-usuario.component';
import { AddUsuarioComponent } from './add-usuario/add-usuario.component';
import { ShowUsuarioComponent } from './show-usuario/show-usuario.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import UsuariosPage from './usuarios.page';

const routes: Routes = [
  {
    path: '',
    component: UsuariosPage,
    children: [
      {
        path:'show/:id',
        component: ShowUsuarioComponent
      },
      {
        path:'add',
        component: AddUsuarioComponent
      },
      {
        path:'put/:id',
        component: PutUsuarioComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosPageRoutingModule {}
