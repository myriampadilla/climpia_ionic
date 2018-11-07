import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarSolicitudPage } from './editar-solicitud';

@NgModule({
  declarations: [
    EditarSolicitudPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarSolicitudPage),
  ],
})
export class EditarSolicitudPageModule {}
