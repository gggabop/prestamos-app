import { PutUsuarioComponent } from './put-usuario/put-usuario.component';
import { AddUsuarioComponent } from './add-usuario/add-usuario.component';
import { ShowUsuarioComponent } from './show-usuario/show-usuario.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariosPageRoutingModule } from './usuarios-routing.module';

import UsuariosPage from './usuarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuariosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UsuariosPage,
                ShowUsuarioComponent,
                AddUsuarioComponent,
                PutUsuarioComponent]
})
export class UsuriosPageModule {}
