import { Component, Input, OnInit} from '@angular/core';
import { DescriptivasService } from '../index.services';
import { FormGroup,FormControl,Validators,FormArray} from '@angular/forms';

import { Formas } from '../../../clases/formas.class';
import {ActivatedRoute ,Router} from '@angular/router';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

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
f:any;
forma:FormGroup;
campos:string[];
editandoA:string;
evaluandoA:string;

  constructor(public router: Router
  ,public _descriptivasService:DescriptivasService) {
        this._descriptivasService.empresas = this._descriptivasService.listarEmpresas();
        this._descriptivasService.empleados = this._descriptivasService.listarEmpleados();
        this._descriptivasService.instituciones = this._descriptivasService.listarInstituciones();
  }


  ngOnInit() {
    this.f = new Formas();
    this.forma = this.f[this.tipo]();
    this.campos =  (this.f[`${this.tipo}Campos`])

    this.servicio[this.tipo].$key =  this.objeto.hasOwnProperty('$key')?this.objeto.$key :null
    this.editandoA = this.tipo =='autorizacion' ?'nroFactura' :'nombre'

                  /* this.forma.get('datos.empleado').valueChanges.subscribe(val => {
                  let valor = (val != null &&   typeof val==='object') ? val.nombre : val;
                  this._descriptivasService.empleados = this.filter(valor,'empleado');
              });*/

  }

  guardar(){

        this.forma.get('datos.empleado').setValue(this._descriptivasService.autoCompleteConfig.empleado.$key);
        this.forma.get('datos.institucion').setValue(this._descriptivasService.autoCompleteConfig.institucion.$key);

       Promise.resolve(this.servicio[`guardar${this.tipo}`](this.forma.value))
         .then((res) => {
          this.forma.patchValue(this.servicio[this.tipo]);
   })
 }
   AgregarEditar(){
     /*console.log(this.empresa.$key,this._empresasService.empresa.$key);*/
     this.servicio[this.tipo].$key =  (this.objeto.$key)?this.objeto.$key :null
     this.servicio[this.tipo].datos = this.objeto;
     /*console.log(this._empresasService.empresa);*/
     this.router.navigate(['/edita',this.tipo]);
 }

 botonMas():boolean{
let masArray:string[]= ['banco','ciudad','pais'];
    return !(masArray.indexOf(this.tipo) > -1)
 }

}
