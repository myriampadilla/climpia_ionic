import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListarSolicitudesPage } from './listar-solicitudes';

@NgModule({
  declarations: [
    ListarSolicitudesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListarSolicitudesPage),
  ],
})
export class ListarSolicitudesPageModule {}
