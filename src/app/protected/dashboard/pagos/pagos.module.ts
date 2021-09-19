import { PutPagoComponent } from './put-pago/put-pago.component';
import { AddPagoComponent } from './add-pago/add-pago.component';
import { ShowPagoComponent } from './show-pago/show-pago.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagosPageRoutingModule } from './pagos-routing.module';

import PedidosPage from './pagos.page';
import PagosPage from './pagos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PagosPage,
                ShowPagoComponent,
                AddPagoComponent,
                PutPagoComponent]
})
export class PagosPageModule {}
