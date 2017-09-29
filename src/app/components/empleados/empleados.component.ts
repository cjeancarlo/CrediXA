import { Component } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { NgForm} from '@angular/forms';
import { Empleado } from '../../clases/empleado.class';
import {DatosComponent} from  '../../components/edicion/modal/datos.component';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styles: []
})
export class EmpleadosComponent extends DatosComponent  {

titulo:string='Empleados';
buscar:string;
emp:any={};

constructor(public _empleadosService:EmpleadosService) {
  super()
      this._empleadosService.items = this._empleadosService.listarEmpleados()
    }

buscarEmpleado(){
    this._empleadosService.items = this._empleadosService.buscarEmpleado(this.buscar);
  }

}
