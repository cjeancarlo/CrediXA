
import { Direccion } from './direccion.class';
import { Banco } from './banco.class';

export class Empleado {
  $key:string;
  datos:{
   nombre:string;
   apellido:string;
   email:string;
   telefono:string;
   activo:boolean;
   institucion:Array<string>;
  }
  direccion:Direccion[];
  banco:Banco[];
  codigo:string;
  cedula:string;

  constructor(values: Object = {}) {
		//super()
    Object.assign(this, values);
		//this.motor = 1123;
		//console.log('este es el motor',this.motor)

  }
}
