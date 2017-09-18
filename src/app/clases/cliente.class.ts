import { Direccion } from './direccion.class';
import { Banco } from './banco.class';

export class Cliente	 {
	 $key:string;
	 datos:{
		codigo:string;
	 	nombre:string;
	 	email:string;
	 	telefono:string;
	 	activo:boolean;
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
