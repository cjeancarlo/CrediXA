import { Cuotas } from './cuotas.class';

export class Autorizacion {
  public $key:string;
  public datos:{
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
  public cuotas:Cuotas[];



 constructor(values: Object = {}) {
   Object.assign(this, values);

 }

}
