import { Injectable } from '@angular/core';
import { PrincipalService } from './principal.service';
import { Empresa } from '../clases/empresa.class';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/Rx';

@Injectable()
export class EmpresasService extends  PrincipalService {

  empresa:Empresa = new Empresa();
  items: FirebaseListObservable<any[]>;
  modelo:string = '/empresas';
  modeloDetalle:string[]=['direcciones','bancos']
   //constructor() { }
   buscarEmpresa(texto:string):FirebaseListObservable<any[]> {
         return this.buscar(texto, this.modelo)
     }

  listarEmpresas():FirebaseListObservable<any[]>{
        return this.listar(`${this.modelo}`)
        }




        guardarempresa(empresa:Empresa):Promise<string> {
          console.log(empresa);
           return Promise.resolve(this.guardar(empresa.datos,this.modelo,empresa.$key))
              .then(($key) => {
                      if(empresa.direccion){
                      this.guardar(empresa.direccion,`${this.modelo}-${this.modeloDetalle[0]}`,$key);
                      }
                      if(empresa.banco){
                      this.guardar(empresa.banco,`${this.modelo}-${this.modeloDetalle[1]}`,$key);
                      }

                    return ($key)
              })
        	}

	eliminarEmpresa($key:string) {
	     this.eliminar(`${this.modelo}`,`${ $key }`);
       this.eliminar(`${this.modelo}-${this.modeloDetalle[0]}`,`${ $key }`);
       this.eliminar(`${this.modelo}-${this.modeloDetalle[1]}`,`${ $key }`);
	}

  eliminarDireccion($key:string){
    this.eliminar(`${this.modelo}-${this.modeloDetalle[0]}/${this.empresa.$key}`,`${ $key }` );
  }


}
