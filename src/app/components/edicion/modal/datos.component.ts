import { Component,ViewChild} from '@angular/core';
import { EdicionComponent } from './edicion.component';
@Component({
  selector: 'app-datos',
  template:''
})
export class DatosComponent  {
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

 }

 LimpiaDatosModal(){
  if(this.hijo){//evita error de render
  this.hijo.forma.reset();
  this.hijo.operacion ="Insertando";
  }
 }

}