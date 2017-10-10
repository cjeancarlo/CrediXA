import { Component,ViewChild} from '@angular/core';
import { EdicionComponent } from './edicion.component';

@Component({
  selector: 'app-datos',
  template:''
})
export class DatosComponent  {

constructor(){


}

@ViewChild(EdicionComponent) hijo: EdicionComponent;
  MuestraDatosModal(o){
   if(this.hijo){//evita error de render
   this.hijo.operacion ="Editando";
   //evita que se traigan datos de /
   //un registros que haya sido editando anteriormente
   this.hijo.forma.reset();
   this.hijo.forma.patchValue({
     $key: o.$key,
     datos:o })
   }

   //traduce el $key guardado en la base de datos por el string o descripcion legible
   //solucion encontrada para desplegar la descripcion en los md-autocomplete
   this.hijo._descriptivasService.dameEmpleado(o.empleado).take(1).subscribe(data=> {
     this.hijo.forma.get('datos.empleado').setValue(`${data.nombre} ${data.apellido}`) }
   )
   //console.log('empleado',o)

 }

 LimpiaDatosModal(){
  if(this.hijo){//evita error de render
  this.hijo.forma.reset();
  this.hijo.operacion ="Insertando";
  }
 }

}
