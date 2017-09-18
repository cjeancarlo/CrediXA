export class Banco {
	 $key:string;
	 datos:{
		codigo:number;
	 	nombre:string;
	 	activo:boolean;
		principal:boolean;
	 }

  constructor(values: Object = {}) {
    Object.assign(this, values);

  }
}
