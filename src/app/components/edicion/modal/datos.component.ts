import { Component,ViewChild} from '@angular/core';
import { EdicionComponent } from './edicion.component';

import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

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
      this.cargaListas();

}

 LimpiaDatosModal(){
  if(this.hijo){//evita error de render
  this.hijo.forma.reset();
  this.hijo.operacion ="Insertando";
  }

      this.cargaListas();

 }

cargaListas(){

if (this.hijo.tipo =='autorizacion'){
  this.hijo._formasDinamicasService.filter(null,'empleado')
            .then((results:IMultiSelectOption[]) => {//lleno la lista de empleados
                  this.hijo._formasDinamicasService.autoCompleteConfig.empleado.listado = results
                  console.log('cargando resultados empleado')
         }).then(()=>{//lleno la lista de instituciones relacionasdas por empleado
                    if(this.hijo.forma.get('datos.empleado').value!=null){
                        let   $joinKey = this.hijo.forma.get('datos.empleado').value[0]
                        this.hijo._formasDinamicasService.filter(null,'institucion',$joinKey)
                          .then((results:IMultiSelectOption[]) =>
                                {this.hijo._formasDinamicasService.autoCompleteConfig.institucion.listado= results})
                          .then(()=>{//y en la lista si hay un cambio limpio  el valor seleccionado de la lista de instituciones
                                        this.hijo.forma.get('datos.empleado').valueChanges
                                .subscribe(val => {
                                        let campo:string ='institucion'
                                        if (val && val[0]){
                                            let   $joinKey = this.hijo.forma.get('datos.empleado').value[0]
                                            this.hijo._formasDinamicasService.filter(null,'institucion',$joinKey)
                                            .then((results:IMultiSelectOption[]) => {
                                            this.hijo._formasDinamicasService.autoCompleteConfig.institucion.listado= results
                                            })
                                        }//end if
                                });
                        });
                  }//end if
        })
  }//end if tipo autotizacion
}

}
