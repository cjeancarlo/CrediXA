export class Cuotas {
  $key:string;
  datos:{
   nroAut:number;
   fechaAPagar:Date;
   fechaPago:Date;
   activo:boolean;
  }

 constructor(values: Object = {}) {
   Object.assign(this, values);

 }
}
