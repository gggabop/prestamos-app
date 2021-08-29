import { PutClienteComponent } from './put-cliente/put-cliente.component';
import { AddClienteComponent } from './add-cliente/add-cliente.component';
import { ShowClienteComponent } from './show-cliente/show-cliente.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientesPageRoutingModule } from './clientes-routing.module';

import ClientesPage from './clientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ClientesPage,
                ShowClienteComponent,
                AddClienteComponent,
                PutClienteComponent]
})
export class ClientesPageModule {}
