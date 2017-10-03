import { Injectable } from '@angular/core';
import { PrincipalService } from './principal.service';
import { Autorizacion } from '../clases/autorizacion.class';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/Rx';


@Injectable()
export class AutorizacionesService  extends PrincipalService  {

  autorizacion:Autorizacion = new Autorizacion();
  items: FirebaseListObservable<any[]>;
  modelo:string = '/autorizaciones';
  modeloDetalle:string[]=['cuotas']
   //constructor() { }
   buscarAutorizacion(texto:string):FirebaseListObservable<any[]> {
         return this.buscar(texto, this.modelo)
     }

  listarAutorizaciones():FirebaseListObservable<any[]>{
        return this.listar(`${this.modelo}`)
        }

        guardarautorizacion(autorizacion:Autorizacion):Promise<string> {
           return Promise.resolve(this.guardar(autorizacion.datos,this.modelo,autorizacion.$key))
              .then(($key) => {
                      if(autorizacion.cuotas){
                      this.guardar(autorizacion.cuotas,`${this.modelo}-${this.modeloDetalle[0]}`,$key);
                      }
                    return ($key)
              })
          }


}
