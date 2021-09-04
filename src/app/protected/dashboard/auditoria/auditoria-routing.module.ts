import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuditoriaPage } from './auditoria.page';

const routes: Routes = [
  {
    path: '',
    component: AuditoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuditoriaPageRoutingModule {}
