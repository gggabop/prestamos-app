import { PutPrestamoComponent } from './put-prestamo/put-prestamo.component';
import { AddPrestamoComponent } from './add-prestamo/add-prestamo.component';
import { ShowPrestamoComponent } from './show-prestamo/show-prestamo.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientesPageRoutingModule } from './prestamos-routing.module';

import PretamosPage from './prestamos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PretamosPage,
                ShowPrestamoComponent,
                AddPrestamoComponent,
                PutPrestamoComponent]
})
export class PretamosPageModule {}
