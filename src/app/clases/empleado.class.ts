
import { Direccion } from './direccion.class';
import { Banco } from './banco.class';

export class Empleado {
  $key:string;
  datos:{
   codigo:string;
   cedula:number;
   nombre:string;
   apellido:string;
   email:string;
   telefono:string;
   activo:boolean;
  }
  direccion:Direccion[];
  banco:Banco[];
  institucion:any;

  constructor(values: Object = {}) {
		//super()
    Object.assign(this, values);
		//this.motor = 1123;
		//console.log('este es el motor',this.motor)

  }
}
