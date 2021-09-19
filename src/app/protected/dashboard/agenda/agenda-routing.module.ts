import { PutNotaComponent } from './put-nota/put-nota.component';
import { AddNotaComponent } from './add-nota/add-nota.component';
import { ShowNotaComponent } from './show-nota/show-nota.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import AgendaPage from './agenda.page';

const routes: Routes = [
  {
    path: '',
    component: AgendaPage,
    children: [
      {
        path:'show/:id',
        component: ShowNotaComponent
      },
      {
        path:'add',
        component: AddNotaComponent
      },
      {
        path:'put/:id',
        component: PutNotaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendaPageRoutingModule {}
