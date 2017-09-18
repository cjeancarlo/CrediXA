import { Component } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { NgForm} from '@angular/forms';
import { Empleado } from '../../clases/empleado.class';


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styles: []
})
export class EmpleadosComponent  {

titulo:string='Empleados';
buscar:string;


constructor(private _empleadosService:EmpleadosService) {
      this._empleadosService.items = this._empleadosService.listarEmpleados()
    }

buscarEmpleado(){
    this._empleadosService.items = this._empleadosService.buscarEmpleado(this.buscar);
  }

}
