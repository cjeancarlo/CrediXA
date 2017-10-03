import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

import { AutorizacionesComponent } from  './components/autorizaciones/autorizaciones.component';

import { ClientesComponent } from './components/clientes/clientes.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';

import { PaisesComponent } from './components/descriptivas/paises/paises.component';
import { CiudadesComponent } from './components/descriptivas/ciudades/ciudades.component';
import { BancosComponent } from  './components/descriptivas/bancos/bancos.component';
import { EmpresasComponent } from  './components/empresas/empresas.component';
import { InstitucionesComponent } from  './components/instituciones/instituciones.component';

import { EdicionGeneralComponent } from  './components/edicion/edicion-general.component';


  const APP_ROUTES: Routes = [
	{ path: 'home', component: HomeComponent },
{ path: 'autorizaciones', component: AutorizacionesComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'empleados', component: EmpleadosComponent },
  { path: 'paises', component: PaisesComponent },
  { path: 'ciudades', component: CiudadesComponent },
  { path: 'bancos', component: BancosComponent },
  { path: 'empresas', component: EmpresasComponent },
  { path: 'institucions', component: InstitucionesComponent },
  { path: 'edita/:tipo', component: EdicionGeneralComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }

]


@NgModule({
  imports: [
   RouterModule.forRoot(
      APP_ROUTES/*,
      { enableTracing: true } // <-- debugging purposes only
      */
    )
  ],
  exports: [
    RouterModule
  ]
})
export class APP_ROUTING { }
