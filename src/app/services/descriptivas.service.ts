import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2/database';
import { PrincipalService } from './principal.service';

import { Pais } from '../clases/pais.class';
import { Ciudad } from '../clases/ciudad.class';
import { Banco } from '../clases/banco.class';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/switchMap';



@Injectable()
export class DescriptivasService extends  PrincipalService  {

//T[] ==Array<T>
autoCompleteConfig={
  "empleado":{"$key":null,
              "concatBusqueda":['cedula','nombre','apellido'],
              "plural":"Empleados",
              "listado":null,
              "join":null
            },
  "institucion":{"$key":null,
              "concatBusqueda":['codigo','nombre'],
              "plural":"Instituciones",
              "listado":null,
              "join":'EmpleadoInstituciones'
            },
  "autorizacion":{"$key":null,
                        "concatBusqueda":['nroFactura','monto'],
                        "plural":"Autorizaciones",
                        "listado":null,
                        "join":null
                      },
  "cliente":{"$key":null,
              "concatBusqueda":['codigo','nombre'],
              "plural":"Clientes",
              "listado":null,
              "join":null
            },
  "empresa":{"$key":null,
          "concatBusqueda":['codigo','nombre'],
          "plural":"Empresas",
          "listado":null,
          "join":null
           }
}

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

  empleados: FirebaseListObservable<any[]>;
  modeloEmpleado:string = '/empleados';


  dameEmpleado($key):FirebaseObjectObservable<any[]>{
              return this.listarObjeto(`${this.modeloEmpleado}/${$key}`)
  }

  dameInstitucion($key):FirebaseObjectObservable<any[]>{
              return this.listarObjeto(`${this.modeloInstitucion}/${$key}`)
  }


  listarEmpleados():FirebaseListObservable<any[]>{
              return this.listar(`${this.modeloEmpleado}`)
  }

listarEmpleadoInstituciones($empleadoKey){
  return this.listar(`${this.modeloEmpleado}/${$empleadoKey}/${this.modeloInstitucion}`)
        .switchMap(Empleado_instituciones => {

            let institucionesObservables = [];
              Empleado_instituciones.forEach(institucion => {

      // Agregar los datos de la institucion a partir del KEY:
        institucionesObservables.push(
            this.listarObjeto(`${this.modeloInstitucion}/${institucion.$value}`)
            .first()
            .do(value => { institucion.nombre = value.nombre;
                       institucion.id= value.$key }
                     ));

      // Add the participants:

      /*Object.keys(institucion.participants).forEach(key => {
        institucionesObservables.push(this.af.database
          .object(`members/${key}`)
          .first()
          .do(value => { institucion.participants[key] = value.username; })
        );
      });*/
    });

    // Join the member observables and use the result selector to
    // return the Empleado_instituciones - which will have been updated.

    return Observable.forkJoin(...institucionesObservables);
  });

}
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
