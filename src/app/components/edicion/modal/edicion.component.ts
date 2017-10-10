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
  EditandoA:string;
  $keytipo={
    "empleado":null
  }

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

    let dropdowns:string[]=['institucion','empleado' ]
        this.campos.forEach(item => {
//          console.log(item,dropdowns.indexOf(item));
          if (dropdowns.indexOf(item) >= 0) {


          //this.initDropDown(item)
          }
        }


        );


    this.servicio[this.tipo].$key =  this.objeto.hasOwnProperty('$key')?this.objeto.$key :null
    this.EditandoA = this.tipo =='autorizacion' ?'nroFactura' :'nombre'

  /*  if (this.objeto.hasOwnProperty('$key')){
           this.operacion ="Editsssando";
           this.forma.patchValue({
             $key: this.objeto.$key,
             datos:this.objeto })
           }else
              this.forma.reset();*/

               this.forma.get('datos.empleado').valueChanges.subscribe(val => {
                  let valor = (val != null &&   typeof val==='object') ? val.nombre : val;
                  console.log('valor',valor);
                  this._descriptivasService.empleados = this.filter(valor);
              });

  }
  filter(texto):FirebaseListObservable<any[]>{
    console.log("FILTER",texto);

      return texto == null ? //trae todos
      this._descriptivasService.listarEmpleados() : //filtra
      this._descriptivasService.listarEmpleados().map(items => {
        const filtrados  = items.filter(item => {
            console.log(item.cedula, texto);
             if(item.nombre.toLowerCase().indexOf(texto.toLowerCase()) >=0 ||
              item.cedula.indexOf(texto) >=0
           ) return item;
              });
      return filtrados;
    })  as FirebaseListObservable<any[]>;
    }

    displayFn(tipo):string {
      if  (tipo != null &&   typeof tipo==='object') {
        //guarda el $key para luego enviarlo a firebase como $key
        this.$keytipo.empleado = tipo.$key;
        return `${tipo.nombre} ${tipo.apellido}`
            }
      return  tipo;

    }

  guardar(){

        this.forma.get('datos.empleado').setValue(this.$keytipo.empleado);

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





 initDropDown(tipo:string){

   function PrimeraLetra(string){
     return string.charAt(0).toUpperCase() + string.slice(1);
   }

   let plural:{} ={}/*= [{'empleado':'empleados'},{'institucion':'instituciones'},{'empresa':'empresas'}]*/
   plural['empleado'] = 'empleados'
   plural['institucion'] = 'instituciones';
   plural['empresa'] = 'empresas';

   let nombreCapitalizado:string=PrimeraLetra(plural[tipo])
   this._descriptivasService[plural[tipo]] = this._descriptivasService[`listar${nombreCapitalizado}`]();
   this._descriptivasService[plural[tipo]].subscribe((t)=> {
   t.forEach(item => {
                     this[`dropdownList${nombreCapitalizado}`].push({"id":item.$key,"itemName":item.nombre});
             })
 })


 this[`dropdownSettings${nombreCapitalizado}`] = {
     singleSelection: true,
     text:nombreCapitalizado,
     enableSearchFilter: true
 };

 }

}
