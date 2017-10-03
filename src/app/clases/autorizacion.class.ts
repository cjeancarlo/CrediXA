import { Cuotas } from './cuotas.class';

export class Autorizacion {
  $key:string;
  datos:{
  fecha:Date;
   nroFactura:string;
   nroAut:number;
   monto:number;
   cuotas:number;
   pagado:number;
   activo:boolean;
   institucion:string;
   empresa:string;
   empleado:string;
  }
  cuotas:Cuotas[];

 constructor(values: Object = {}) {
   Object.assign(this, values);

 }

}
