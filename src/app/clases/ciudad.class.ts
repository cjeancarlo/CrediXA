export class Ciudad {
	 $key:string;
	 datos:{
		codigo:number;
	 	nombre:string;
	 	activo:boolean;
	 }

  constructor(values: Object = {}) {
    Object.assign(this, values);

  }
}
