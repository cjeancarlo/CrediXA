import { BrowserModule } from '@angular/platform-browser';

import { NgModule/*, NO_ERRORS_SCHEMA*/ } from '@angular/core';
//import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { FormsModule,ReactiveFormsModule }  from '@angular/forms';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


import { APP_ROUTING } from './app.routes';
import { ClientesComponent } from './components/clientes/clientes.component';

import { PrincipalService } from './services/principal.service';
import { ClientesService } from './services/clientes.service';
import { InstitucionesService } from './services/instituciones.service';
import { EmpleadosService } from './services/empleados.service';
import { DescriptivasService } from './services/descriptivas.service';
import { AutorizacionesService } from './services/autorizaciones.service';
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
/*import { DetalleBancoComponent } from './components/detalle-banco/detalle-banco.component';
imort { DetalleDireccionComponent } from './components/detalle-direccion/detalle-direccion.component';*/
import { EdicionComponent } from './components/edicion/modal/edicion.component';
import { DatosComponent } from './components/edicion/modal/datos.component';
import { EdicionGeneralComponent } from './components/edicion/edicion-general.component';
import { DetalleComponent } from './components/edicion/detalle/detalle.component';
import { InstitucionesComponent } from './components/instituciones/instituciones.component';
import { AutorizacionesComponent } from './components/autorizaciones/autorizaciones.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
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
    EdicionComponent,
    DatosComponent,
    EdicionGeneralComponent,
    DetalleComponent,
    InstitucionesComponent,
    AutorizacionesComponent
  ],
  imports: [
    //MDBBootstrapModule.forRoot(),
    AngularMultiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    APP_ROUTING,
    AngularFireModule.initializeApp(firebase),
    AngularFireDatabaseModule // imports firebase/database, only needed for database features
],
  //schemas: [ NO_ERRORS_SCHEMA ],
  providers: [AngularFireAuth,
    AutorizacionesService,EmpresasService,InstitucionesService,EmpleadosService,ClientesService,DescriptivasService,PrincipalService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
