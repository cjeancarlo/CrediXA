import { Injectable } from '@angular/core';
import { PrincipalService } from './principal.service';
import { Empleado } from '../clases/empleado.class';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/Rx';


@Injectable()
export class EmpleadosService   extends  PrincipalService{



  empleado:Empleado = new Empleado();
  items: FirebaseListObservable<any[]>;
  modelo:string = '/empleado';
  modeloDetalle:string[]=['gremios']
   //constructor() { }
   buscarEmpleado(texto:string):FirebaseListObservable<any[]> {
         return this.buscar(texto, this.modelo)
     }

  listarEmpleados():FirebaseListObservable<any[]>{
        return this.listar(`${this.modelo}`)
        }

        guardarEmpleado (empleado:Empleado):Promise<string> {
           return Promise.resolve(this.guardar(empleado.datos,this.modelo,empleado.$key))
              .then(($key) => {
                    return ($key)
              })
          }

}
