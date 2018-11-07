import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { CrearCuentaPage } from './../pages/crear-cuenta/crear-cuenta';
import { IniciarSesionPage } from './../pages/iniciar-sesion/iniciar-sesion';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UsuariosProvider } from '../providers/usuarios/usuarios';
import { ClientesProvider } from '../providers/clientes/clientes';
import { SolicitudesProvider } from '../providers/solicitudes/solicitudes';
import { DominiosProvider } from '../providers/dominios/dominios';
import { ValorDominiosProvider } from '../providers/valor-dominios/valor-dominios';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
   providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuariosProvider,
    ClientesProvider,
    SolicitudesProvider,
    DominiosProvider,
    ValorDominiosProvider
  ]
})
export class AppModule {}
