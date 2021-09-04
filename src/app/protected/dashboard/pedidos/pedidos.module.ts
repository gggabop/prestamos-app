import { PutPedidoComponent } from './put-pedido/put-pedido.component';
import { AddPedidoComponent } from './add-pedido/add-pedido.component';
import { ShowPedidoComponent } from './show-pedido/show-pedido.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosPageRoutingModule } from './pedidos-routing.module';

import PedidosPage from './pedidos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PedidosPage,
                ShowPedidoComponent,
                AddPedidoComponent,
                PutPedidoComponent]
})
export class PedidosPageModule {}
