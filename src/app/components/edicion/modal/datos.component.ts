import { Component,ViewChild} from '@angular/core';
import { EdicionComponent } from './edicion.component';

@Component({
  selector: 'app-datos',
  template:''
})
export class DatosComponent  {

constructor(){}

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
   //funciones involucradas
   //suscribeteACambios(key,o)
   //cPL(string)
   //displayOption(data,item)


for (var key in this.hijo._descriptivasService.autoCompleteConfig) {
    if(o[key])
      this.suscribeteACambios(key,o)
     }
}
private suscribeteACambios(item,o){
         this.hijo._descriptivasService[`dame${this.cPL(item)}`](o[item]).take(1).subscribe(
           data=> {this.hijo.forma.get(`datos.${item}`).setValue(this.displayOption(data,item))
        })
}

private cPL(string) {//capitalizar primera letra =cPL
     return string.charAt(0).toUpperCase() + string.slice(1);
 }

private  displayOption(data,item){
 let display:string="";
 this.hijo._descriptivasService.autoCompleteConfig[item].concatBusqueda.forEach(b => {
 display +=`${data[b]} `;
 })
//console.log('display',display);
   return display;
}


 LimpiaDatosModal(){
  if(this.hijo){//evita error de render
  this.hijo.forma.reset();
  this.hijo.operacion ="Insertando";
  }
 }

}
