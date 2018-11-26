import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarServicioPage } from './editar-servicio';

@NgModule({
  declarations: [
    EditarServicioPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarServicioPage),
  ],
})
export class EditarServicioPageModule {}
