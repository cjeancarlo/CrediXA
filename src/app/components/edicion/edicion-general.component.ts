import { Component, OnInit,Injector,Input } from '@angular/core';
import { AutorizacionesService, EmpleadosService,InstitucionesService,EmpresasService,ClientesService,DescriptivasService } from './index.services';
import { Formas } from '../../clases/formas.class';
import { FormGroup,FormControl,Validators,FormArray} from '@angular/forms';
import { Observable } from 'rxjs/Rx'
import {ActivatedRoute ,Router} from '@angular/router';
import 'rxjs/add/operator/take';
import { IMultiSelectOption,IMultiSelectSettings } from 'angular-2-dropdown-multiselect';

@Component({
  selector: 'app-edicion-general',
  templateUrl: './edicion-general.component.html',
  styles: []
})
export class EdicionGeneralComponent implements OnInit{

  private sub: any;
  f:any;
  forma:FormGroup;
  campos:string[]=[];
  clickeado:boolean = false;
  operacion:string = "Agregando";
  servicio:any;
  tipo:string;

  myOptions: IMultiSelectOption[] = [];


 mySettings: IMultiSelectSettings = {
 pullRight: true,
 enableSearch: true,
 checkedStyle: 'fontawesome',
 buttonClasses: 'btn btn-default btn-secondary',
 selectionLimit: 0,
 closeOnSelect: false,
 autoUnselect: false,
 showCheckAll: true,
 showUncheckAll: true,
 fixedTitle: true,
 maxHeight: '300px',
 isLazyLoad: true,
 loadViewDistance: 1,
 stopScrollPropagation: true
 };



    constructor(public injector:Injector,private route:ActivatedRoute, private _descriptivasService:DescriptivasService) {      //los cargo a este nivel para evitar cargarlos cada vez que llame al detalle
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
           this.dameCamposForma()

           this.filter().then((results:IMultiSelectOption[]) => {
              this.myOptions= results
              console.log('cargando resultados')
            })

           console.log('llenando forma',this.servicio[this.tipo].datos)
             if (this.servicio[this.tipo].hasOwnProperty('$key')){
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
case 'autorizacion':
      return AutorizacionesService;
 default:
  console.error('sin servcio definido, haz algo')
      return
}

     }

     ngOnDestroy() {
   this.sub.unsubscribe();
 }

filter(texto:string=null){
let myOptions=[];
return  new Promise(resolve=>{
    let  selectedItems   = this._descriptivasService[`listarInstituciones`]()
    selectedItems.take(1).subscribe(items=> {
        items.filter(item => {
          let buscarPor:string='';
          this._descriptivasService.autoCompleteConfig.institucion.concatBusqueda.forEach(b => {
              buscarPor +=`${item[b]} `;
              })

              if (texto==null){
                  myOptions.push({id:item.$key,name: item.nombre});
              }else{
                    if( buscarPor.toLowerCase().indexOf(texto.toLowerCase()) >=0){
                        myOptions.push({id:item.$key,name: item.nombre});
                        }
               }
               });
               resolve(myOptions)

          })

        })

        //return  p
  }

loadData = (event)=> {
       let filter = event.filter;
       let length = event.length;
        this.filter(filter).then((results:IMultiSelectOption[]) => {
          console.log(results/*, JSON.parse(results)*/);
          this.myOptions= results
        });
}


}
