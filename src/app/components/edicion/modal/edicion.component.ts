import {Component, Input, OnInit} from '@angular/core';
import {FormasDinamicasService} from '../index.services';
import {FormGroup} from '@angular/forms';
import {Formas} from '../../../clases/formas.class';
import {ActivatedRoute ,Router} from '@angular/router';
import {IMultiSelectOption} from 'angular-2-dropdown-multiselect';

@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.component.html',
  styles: []
})
export class EdicionComponent implements OnInit {

@Input('tipo') tipo;
@Input('objeto') objeto;
@Input('servicio') servicio;

operacion:string = "Insertando";
forma:FormGroup;

editandoA:string;
evaluandoA:string;

  constructor(public router: Router,
              public _formasDinamicasService:FormasDinamicasService ) {  }

  ngOnInit() {
    this.forma = this._formasDinamicasService.creaForma(this.tipo)
    this.servicio[this.tipo].$key =  this.objeto.hasOwnProperty('$key')?this.objeto.$key :null
    this.editandoA = this.tipo =='autorizacion' ?'nroFactura' :'nombre'
  }

  guardar(){
       Promise.resolve(this.servicio[`guardar${this.tipo}`](this.forma.value))
         .then((res) => {
          this.forma.patchValue(this.servicio[this.tipo]);
   })
 }
   AgregarEditar(){
     this.servicio[this.tipo].$key =  (this.objeto.$key)?this.objeto.$key :null
     this.servicio[this.tipo].datos = this.objeto;
     this.router.navigate(['/edita',this.tipo]);
 }

 botonMas():boolean{
   let masArray:string[]= ['banco','ciudad','pais'];
      return !(masArray.indexOf(this.tipo) > -1)
 }

 loadData = (event,campo)=> {
        let filter = event.filter;
        let length = event.length;
        let $joinKey:string=null;

          if(this.tipo== 'autorizacion' && campo =='institucion' ){
            //sive para obtener el Key del empleado para asi consultar sus instituciones
              $joinKey= this.forma.get('datos.empleado').value[0]
              }
              this._formasDinamicasService.filter(filter,campo,$joinKey).then((results:IMultiSelectOption[]) => {
              this._formasDinamicasService.autoCompleteConfig[campo].listado= results
         });
 }

}
