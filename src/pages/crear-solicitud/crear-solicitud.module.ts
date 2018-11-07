import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CrearSolicitudPage } from './crear-solicitud';

@NgModule({
  declarations: [
    CrearSolicitudPage,
  ],
  imports: [
    IonicPageModule.forChild(CrearSolicitudPage),
  ],
})
export class CrearSolicitudPageModule {}
