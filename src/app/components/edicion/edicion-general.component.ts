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
  campos:string[];
  clickeado:boolean = false;
  operacion:string = "Agregando";
  servicio:any;
  tipo:string;

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
           this.campos =  (this.f[`${this.tipo}Campos`])
//console.log(this.servicio[this.tipo].datos,this.servicio[this.tipo].$key,this.servicio[this.tipo].hasOwnProperty('$key'));
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

         }

         onChanges(): void {
           this.forma.valueChanges.subscribe(val => {
            if(this.clickeado)  this.clickeado= false;
           });
         }


         guardar(){
             Promise.resolve(this.servicio[`guardar${this.tipo}`](this.forma.value))
               .then((res) => {
                console.log('respuesta',res);
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

dameDetalles(){
      Object.keys(this.forma.controls).forEach(key => {
        if( this.forma.get(key).constructor === FormArray ){
           console.log(key);
        }
      });

}
     resetDetalle(grupoDetalle:string){
       const control = <FormArray>this.forma.controls[grupoDetalle];
       let len = control.length;
       if (len > 1)
         console.log('borrando')
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

}
