import { PutNotaComponent } from './put-nota/put-nota.component';
import { AddNotaComponent } from './add-nota/add-nota.component';
import { ShowNotaComponent } from './show-nota/show-nota.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendaPageRoutingModule } from './agenda-routing.module';

import AgendaPage from './agenda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AgendaPage,
                ShowNotaComponent,
                AddNotaComponent,
                PutNotaComponent]
})
export class AgendaPageModule {}
