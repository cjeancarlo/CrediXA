import { Banco } from './banco.class';
import { Direccion } from './direccion.class';


export class Institucion {
  $key:string;
  datos:{
   codigo:string;
   nombre:string;
   email:string;
   telefono:string;
   activo:boolean;
   empresa:string;
  }
  direccion:Direccion[];
  banco:Banco[];



constructor(values: Object = {}) {
		//super()
    Object.assign(this, values);
		//this.motor = 1123;
		//console.log('este es el motor',this.motor)

  }
}
