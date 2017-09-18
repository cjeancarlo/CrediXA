import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { PrincipalService } from './principal.service';

import { Pais } from '../clases/pais.class';
import { Ciudad } from '../clases/ciudad.class';

import { Banco } from '../clases/banco.class';


@Injectable()
export class DescriptivasService extends  PrincipalService  {


  paises: FirebaseListObservable<any[]>;
  pais:Pais = new Pais();

  bancos: FirebaseListObservable<any[]>;
  banco:Banco = new Banco();

  ciudades: FirebaseListObservable<any[]>;
  ciudad:Ciudad = new Ciudad();

  modelo:string = '/paises';
  ciudadModelo:string = '/ciudades';

  modeloBanco:string = '/bancos';



listarBancos():FirebaseListObservable<any[]>{
          return this.listar(`${this.modeloBanco}`)
          }
buscarBanco(texto:string, cantidad:number=10):FirebaseListObservable<any[]> {
                return this.buscar(texto, this.modeloBanco)
            }

guardarBanco (banco:Banco):Promise<string> {
            	  return this.guardar(banco.datos, `${ this.modeloBanco}`,banco.$key);
}

eliminarBanco($key:string) {
      this.eliminar(`${this.modeloBanco}`,`${ $key }`);
		}

buscarCiudad(texto:string, cantidad:number=10):FirebaseListObservable<any[]> {
      return this.buscar(texto, `${this.modelo}/${this.pais.$key}/${this.ciudadModelo}`)
  }

listarCiudades():FirebaseListObservable<any[]>{
        let urlKey:string = `${this.modelo}/${this.pais.$key}/${this.ciudadModelo}`
        return this.listar(urlKey)
        }

guardarCiudad(ciudad:Ciudad):Promise<string> {
  return this.guardar(ciudad.datos, `${this.modelo}/${this.pais.$key}/${this.ciudadModelo}`,ciudad.$key);
}

eliminarCiudad($key:string) {
      this.eliminar(`${this.modelo}/${this.pais.$key}/${this.ciudadModelo}`,`${ $key }`);
}

///paises
buscarPais(texto:string, cantidad:number=10):FirebaseListObservable<any[]> {
      return this.buscar(texto, this.modelo)
  }

listarPaises():FirebaseListObservable<any[]>{
        return this.listar(`${this.modelo}`)
        }

guardarPais (pais:Pais):Promise<string> {
	  return this.guardar(pais.datos, `${ this.modelo}`,pais.$key);
	}

eliminarPais($key:string) {
      this.eliminar(`${this.modelo}`,`${ $key }`);
		}

}
