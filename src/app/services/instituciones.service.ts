import { Injectable } from '@angular/core';
import { PrincipalService } from './principal.service';
import { Institucion } from '../clases/institucion.class';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/Rx';

@Injectable()
export class InstitucionesService extends PrincipalService  {

  institucion:Institucion = new Institucion();
  items: FirebaseListObservable<any[]>;
  modelo:string = '/instituciones';
  modeloDetalle:string[]=['direcciones','bancos','instituciones']
   //constructor() { }
   buscarInstitucion(texto:string):FirebaseListObservable<any[]> {
         return this.buscar(texto, this.modelo)
     }

  listarInstituciones():FirebaseListObservable<any[]>{
        return this.listar(`${this.modelo}`)
        }

        guardarinstitucion(institucion:Institucion):Promise<string> {
           return Promise.resolve(this.guardar(institucion.datos,this.modelo,institucion.$key))
              .then(($key) => {
                      if(institucion.direccion){
                      this.guardar(institucion.direccion,`${this.modelo}-${this.modeloDetalle[0]}`,$key);
                      }
                      if(institucion.banco){
                      this.guardar(institucion.banco,`${this.modelo}-${this.modeloDetalle[1]}`,$key);
                      }

                    return ($key)
              })
          }

}
