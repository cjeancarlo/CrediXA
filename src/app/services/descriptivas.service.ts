import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { PrincipalService } from './principal.service';

import { Pais } from '../clases/pais.class';
import { Ciudad } from '../clases/ciudad.class';
import { Banco } from '../clases/banco.class';


@Injectable()
export class DescriptivasService extends  PrincipalService  {

//T[] ==Array<T>

  paises: FirebaseListObservable<any[]>;
  pais:Pais = new Pais();
  modeloPais:string = '/paises';

  bancos: FirebaseListObservable<any[]>;
  banco:Banco = new Banco(); //guarda el objeto que va a ser editado o agregado por el componente edicion.
  modeloBanco:string = '/bancos';

  ciudades= []
  ciudad:Ciudad = new Ciudad(); //guarda el objeto que va a ser editado o agregado por el componente edicion.
  modeloCiudad:string = '/ciudades';

  empresas: FirebaseListObservable<any[]>;
  modeloEmpresa:string = '/empresas';

  instituciones: FirebaseListObservable<any[]>;
  modeloInstitucion:string = '/instituciones';


listarInstituciones():FirebaseListObservable<any[]>{
            return this.listar(`${this.modeloInstitucion}`)
}


listarEmpresas():FirebaseListObservable<any[]>{
            return this.listar(`${this.modeloEmpresa}`)
}

listarBancos():FirebaseListObservable<any[]>{
          return this.listar(`${this.modeloBanco}`)
}
buscarBanco(texto:string, cantidad:number=10):FirebaseListObservable<any[]> {
                return this.buscar(texto, this.modeloBanco)
}

guardarbanco (banco:Banco):Promise<string> {
            	  return this.guardar(banco.datos, `${ this.modeloBanco}`,banco.$key);
}

eliminarBanco($key:string) {
      this.eliminar(`${this.modeloBanco}`,`${ $key }`);
}

buscarCiudad(texto:string, cantidad:number=10):FirebaseListObservable<any[]> {
      return this.buscar(texto, `${this.modeloPais}/${this.pais.$key}/${this.modeloCiudad}`)
}

listarCiudades():FirebaseListObservable<any[]>{
//  console.log('listandoCiudades',`${this.modeloPais}/${this.pais.$key}/${this.modeloCiudad}`);
        let urlKey:string = `${this.modeloPais}/${this.pais.$key}/${this.modeloCiudad}`
        return this.listar(urlKey)
        }

guardarciudad(ciudad:Ciudad):Promise<string> {
  return this.guardar(ciudad.datos, `${this.modeloPais}/${this.pais.$key}/${this.modeloCiudad}`,ciudad.$key);
}

eliminarCiudad($key:string) {
      this.eliminar(`${this.modeloPais}/${this.pais.$key}/${this.modeloCiudad}`,`${ $key }`);
}

///paises
buscarPais(texto:string, cantidad:number=10):FirebaseListObservable<any[]> {
      return this.buscar(texto, this.modeloPais)
  }

listarPaises():FirebaseListObservable<any[]>{
        return this.listar(`${this.modeloPais}`)
        }

guardarpais (pais:Pais):Promise<string> {
	  return this.guardar(pais.datos, `${ this.modeloPais}`,pais.$key);
	}

eliminarPais($key:string) {
      this.eliminar(`${this.modeloPais}`,`${ $key }`);
		}

}
