import { BrowserModule } from '@angular/platform-browser';

import { NgModule/*, NO_ERRORS_SCHEMA*/ } from '@angular/core';
//import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { FormsModule,ReactiveFormsModule }  from '@angular/forms';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


import { APP_ROUTING } from './app.routes';
import { ClienteComponent } from './components/clientes/cliente.component';
import { ClientesComponent } from './components/clientes/clientes.component';

import { PrincipalService } from './services/principal.service';
import { ClientesService } from './services/clientes.service';
import { EmpleadosService } from './services/empleados.service';
import { DescriptivasService } from './services/descriptivas.service';
import { EmpresasService } from './services/empresas.service';
import { AuthService } from './services/auth.service';

import { firebase } from './config/firebase.config';
import { MuestraConfirmacionComponent } from './components/muestra-alerta/muestra-confirmacion.component';
import { MuestraAlertaComponent } from './components/muestra-alerta/muestra-alerta.component';


import { PaisesComponent } from './components/descriptivas/paises/paises.component';
import { CiudadesComponent } from './components/descriptivas/ciudades/ciudades.component';
import { BancosComponent } from './components/descriptivas/bancos/bancos.component';
import { RegistroComponent } from './components/auth/registro/registro.component';
import { LoginComponent } from './components/auth/login//login.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { EmpresaComponent } from './components/empresas/empresa.component';
import { DetalleBancoComponent } from './components/detalle-banco/detalle-banco.component';
import { DetalleDireccionComponent } from './components/detalle-direccion/detalle-direccion.component';
import { EdicionComponent } from './components/edicion/modal/edicion.component';
import { DatosComponent } from './components/edicion/modal/datos.component';
import { EdicionGeneralComponent } from './components/edicion/edicion-general.component';






@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    ClienteComponent,
    MuestraAlertaComponent,
    ClientesComponent,
    MuestraConfirmacionComponent,
    PaisesComponent,
    CiudadesComponent,
    BancosComponent,
    RegistroComponent,
    LoginComponent,
    EmpleadosComponent,
    EmpresasComponent,
    EmpresaComponent,
    DetalleBancoComponent,
    DetalleDireccionComponent,
    EdicionComponent,
    DatosComponent,
    EdicionGeneralComponent
  ],
  imports: [
    //MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    APP_ROUTING,
    AngularFireModule.initializeApp(firebase),
    AngularFireDatabaseModule // imports firebase/database, only needed for database features
],
  //schemas: [ NO_ERRORS_SCHEMA ],
  providers: [AngularFireAuth,
    EmpresasService,EmpleadosService,ClientesService,DescriptivasService,PrincipalService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
