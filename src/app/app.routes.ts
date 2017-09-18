import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { ClienteComponent } from './components/clientes/cliente.component';
import { PaisesComponent } from './components/descriptivas/paises/paises.component';
import { CiudadesComponent } from './components/descriptivas/ciudades/ciudades.component';
import { BancosComponent } from  './components/descriptivas/bancos/bancos.component';
import { EmpresasComponent } from  './components/empresas/empresas.component';
import { EmpresaComponent } from  './components/empresas/empresa.component';


  const APP_ROUTES: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'clientes', component: ClientesComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'empleados', component: EmpleadosComponent },
  { path: 'paises', component: PaisesComponent },
  { path: 'ciudades', component: CiudadesComponent },
  { path: 'bancos', component: BancosComponent },
  { path: 'empresas', component: EmpresasComponent },
  { path: 'empresa', component: EmpresaComponent },
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
