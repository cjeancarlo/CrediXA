import { Component, Input } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { NgForm } from '@angular/forms';
import {ActivatedRoute ,Router} from '@angular/router';
import { Empleado } from '../../clases/empleado.class';
@Component({
  selector: 'app-empleado-edicion-modal',
  templateUrl: './empleado-edicion-modal.component.html',
  styles: []
})
export class EmpleadoEdicionModalComponent {

  operacion:string;

  @Input('empleado') empleado;
  constructor(public _empleadosService:EmpleadosService,public router: Router) {
     //this.operacion = (this.cliente.$key)?'Editando' :'Insertando'
   }

    guardar(){
       this._empleadosService.empleado.$key =  (this.empleado.$key)?this.empleado.$key :null
       this._empleadosService.empleado.datos = this.empleado;
         Promise.resolve(this._empleadosService.guardarEmpleado(this._empleadosService.empleado))
           .then((res) => {
            console.log(res);
            //this._clientesService.cliente = new Cliente();
     })
  }





     AgregarEditar(){
       /*console.log(this.cliente.$key,this._clientesService.cliente.$key);*/
       this._empleadosService.empleado.$key =  (this.empleado.$key)?this.empleado.$key :null
       this._empleadosService.empleado.datos = this.empleado;
       /*console.log(this._clientesService.cliente);*/
       this.router.navigate(['/empleado']);
   }

}
