import { Component, OnInit,Injector,Input } from '@angular/core';
import { EmpleadosService,InstitucionesService,EmpresasService,ClientesService,DescriptivasService } from './index.services';
import { Formas } from '../../clases/formas.class';
import { FormGroup,FormControl,Validators,FormArray} from '@angular/forms';
import { Observable } from 'rxjs/Rx'
import {ActivatedRoute ,Router} from '@angular/router';
import 'rxjs/add/operator/take';


@Component({
  selector: 'app-edicion-general',
  templateUrl: './edicion-general.component.html',
  styles: []
})
export class EdicionGeneralComponent implements OnInit {

  private sub: any;
  f:any;
  forma:FormGroup;
  campos:string[]=[];
  clickeado:boolean = false;
  operacion:string = "Agregando";
  servicio:any;
  tipo:string;

dropdownList  = [];
selectedItems = [];
dropdownSettings = {};

    constructor(public injector:Injector,private route:ActivatedRoute, private _descriptivasService:DescriptivasService) {
      //los cargo a este nivel para evitar cargarlos cada vez que llame al detalle
      this._descriptivasService.paises = this._descriptivasService.listarPaises();
      this._descriptivasService.bancos = this._descriptivasService.listarBancos();
      this._descriptivasService.empresas = this._descriptivasService.listarEmpresas();
  }
         ngOnInit() {
                this.sub = this.route.params.subscribe(params => {
                this.tipo = params['tipo'];
                this.servicio = this.injector.get(this.dameServicio());
          });

           this.f = new Formas();
           this.forma = this.f[this.tipo]();
           //this.campos =  (this.f[`${this.tipo}Campos`])
           this.dameCamposForma()
if (this.servicio[this.tipo].hasOwnProperty('$key')){
//  console.log('pase')
         if (this.servicio[this.tipo].$key!=null)
               {
               this.operacion ="Editando";
               this.forma.patchValue({
                 $key: this.servicio[this.tipo].$key,
                 datos:this.servicio[this.tipo].datos
               });
              }
           }
          this.onChanges();
          this.initInstitucionDropDown();

         }

         onChanges(): void {
           /*let control:FormGroup =  <FormGroup>this.forma.controls['datos']
             Object.keys(control.controls).forEach( (key) => {
                  console.log(key,this.forma.get(`datos.${key}`).valid)
              });*/
//console.log(this.forma);

           this.forma.valueChanges.subscribe(val => {
            if(this.clickeado)  this.clickeado= false;


           });
         }


         guardar(){
             Promise.resolve(this.servicio[`guardar${this.tipo}`](this.forma.value))
               .then((res) => {
                //console.log('respuesta',res);
               this.servicio[this.tipo].$key = res;
               this.operacion ="Editando";
               this.forma.patchValue(this.servicio[this.tipo]);
               this.clickeado= true
         })
     }

      reset(){
        this.operacion = "Agregando";
         this.resetDetalle('direccion')
         this.resetDetalle('banco')

      }

dameCamposForma():void{
    let c:Array<string> =[];
     const control = <FormGroup>this.forma.controls['datos'];
     Object.keys(control.controls).forEach( (key) => {
          this.campos.push(key)
      });
}
     resetDetalle(grupoDetalle:string){
       const control = <FormArray>this.forma.controls[grupoDetalle];
       let len = control.length;
       if (len > 1)
         //console.log('borrando')
           for (var i = len - 1; i > 0; i--)
           control.removeAt(i);
           this.forma.reset();
     }

     private   dameServicio()
     {
switch(this.tipo) {
case 'empresa':
     return EmpresasService;
case 'empleado':
      return EmpleadosService
case 'cliente':
      return ClientesService;
case 'institucion':
      return InstitucionesService;
 default:
      return
}

     }

     ngOnDestroy() {
   this.sub.unsubscribe();
 }

initInstitucionDropDown(){
this._descriptivasService.instituciones = this._descriptivasService.listarInstituciones();
this._descriptivasService.instituciones.subscribe((institucion)=> {
  institucion.forEach(item => {
                    this.dropdownList.push({"id":item.$key,"itemName":item.nombre});
            })
})

let  selectedItems  = this._descriptivasService.listar(`${this.tipo}/${this.servicio[this.tipo].$key}/instituciones`)
selectedItems.subscribe((institucion)=> {
  institucion.forEach(item => {
                    this.selectedItems.push({"id":item.$key,"itemName":item.nombre});
            })
})

this.dropdownSettings = {
                                    singleSelection: false,
                                    text:"Instituciones",
                                    selectAllText:'Seleccione todos',
                                    unSelectAllText:'Deselecione Todos',
                                    enableSearchFilter: true
                                  };

}
onItemSelect(item){
       //console.log('Selected Item:');
       //console.log(item);
   }
   OnItemDeSelect(item){
      // console.log('De-Selected Item:');
       //console.log(item);
   }

}
