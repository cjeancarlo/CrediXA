import { Component, Input, OnInit} from '@angular/core';
import { DescriptivasService } from '../index.services';
import { FormGroup,FormControl,Validators,FormArray} from '@angular/forms';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { Formas } from '../../../clases/formas.class';
import {ActivatedRoute ,Router} from '@angular/router';

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


  dropdownListInstituciones  = [];
  dropdownSettingsInstituciones ={}
  dropdownListEmpleados  = [];
  dropdownSettingsEmpleados = {};




  constructor(public router: Router
  ,private _descriptivasService:DescriptivasService
  ,private _sanitizer: DomSanitizer
) {
        this._descriptivasService.empresas = this._descriptivasService.listarEmpresas();

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
  ngOnInit() {
    this.f = new Formas();
    this.forma = this.f[this.tipo]();
    this.campos =  (this.f[`${this.tipo}Campos`])

    let dropdowns:string[]=['institucion','empleado' ]
        this.campos.forEach(item => {
//          console.log(item,dropdowns.indexOf(item));
          if (dropdowns.indexOf(item) >= 0) {
          this.initDropDown(item)
          }
        }

        );








    this.servicio[this.tipo].$key =  this.objeto.hasOwnProperty('$key')?this.objeto.$key :null
    this.EditandoA = this.tipo =='autorizacion' ?'nroFactura' :'nombre'

    if (this.objeto.hasOwnProperty('$key')){
           this.operacion ="Editando";
           this.forma.patchValue({
             $key: this.objeto.$key,
             datos:this.objeto })
           }else
              this.forma.reset();

  }

  guardar(){

console.log(this.forma.value,
  'GUARDAR',this.forma.controls['datos']['institucion'] )



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
 autocompleListFormatter = (data: any) : SafeHtml => {
     let html = `<span>${data.name}</span>`;
     return this._sanitizer.bypassSecurityTrustHtml(html);
   }

customCallback(e,campo){
console.log(e,campo)
  if(e){

    this.forma.controls['datos.'+campo] = null
  }

}





}
