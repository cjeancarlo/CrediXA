import { Component, OnInit,Injector,Input } from '@angular/core';
import { AutorizacionesService, EmpleadosService,InstitucionesService,EmpresasService,ClientesService,FormasDinamicasService } from './index.services';
import { Formas } from '../../clases/formas.class';
import { FormGroup,FormControl,Validators,FormArray} from '@angular/forms';
import { Observable } from 'rxjs/Rx'
import {ActivatedRoute ,Router} from '@angular/router';
import 'rxjs/add/operator/take';
import { IMultiSelectOption,IMultiSelectSettings,IMultiSelectTexts } from 'angular-2-dropdown-multiselect';

@Component({
  selector: 'app-edicion-general',
  templateUrl: './edicion-general.component.html',
  styles: []
})
export class EdicionGeneralComponent implements OnInit{

  private sub: any;




  //f:any;
  forma:FormGroup;
  campos:string[]=[];
  clickeado:boolean = false;
  operacion:string = "Agregando";
  servicio:any;
  tipo:string;
  colunma:boolean=false;

editandoA:string ='';

  myOptions: IMultiSelectOption[] = [];

  myTexts: IMultiSelectTexts = {
      checkAll: 'Todos',
      uncheckAll: 'Ninguno',
      checked: 'seleccionado',
      checkedPlural: 'seleccionados',
      searchPlaceholder: 'Buscar',
      searchEmptyResult: 'ningun resultado...',
      searchNoRenderText: 'Type in search box to see results...',
      defaultTitle: 'instituciones',
      allSelected: 'Todas',
  };


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



    constructor(public injector:Injector,private route:ActivatedRoute, private _formasDinamicasService:FormasDinamicasService) {      //los cargo a este nivel para evitar cargarlos cada vez que llame al detalle
      this._formasDinamicasService.paises = this._formasDinamicasService.listarPaises();
      this._formasDinamicasService.bancos = this._formasDinamicasService.listarBancos();
      this._formasDinamicasService.empresas = this._formasDinamicasService.listarEmpresas();
      }

      ngOnInit() {

                this.sub = this.route.params.subscribe(params => {
                this.tipo = params['tipo'];
                this.servicio = this.injector.get(this.dameServicio());
              this.editandoA = this.tipo =='autorizacion' ?'nroFactura' :'nombre'
                });

           //this.f = new Formas();
           this.forma = this._formasDinamicasService.creaForma(this.tipo)
           //this.dameCamposForma()



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


                    /*  //TODO
                     this._formasDinamicasService.filter(null,'').then((results:IMultiSelectOption[]) => {
                        this.myOptions= results
                        console.log('cargando resultados')
                      }).then(()=>{
                          this.onChanges();
                      })*/




         }


ngAfterContentInit (){
 //this.clickeado= true;
 console.log('ngAfterContentInit')

}
         onChanges(): void {
           this.forma.valueChanges.subscribe(val => {
             if(this.clickeado)  {
               this.clickeado= false;
             }
           });
         }


         guardar(){
             Promise.resolve(this.servicio[`guardar${this.tipo}`](this.forma.value))
               .then((res) => {
                //console.log('respuesta',res);
               this.servicio[this.tipo].$key = res;
               this.operacion ="Editando";
               //this.forma.patchValue(this.servicio[this.tipo]);
               this.clickeado= true
         })
     }

      reset(){
        this.operacion = "Agregando";
         this.resetDetalle('direccion')
         this.resetDetalle('banco')

      }

/*dameCamposForma():void{
    let c:Array<string> =[];
     const control = <FormGroup>this.forma.controls['datos'];
     Object.keys(control.controls).forEach( (key) => {
          this.campos.push(key)
      });
}*/
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

/*filter(texto:string=null){
let myOptions=[];
return  new Promise(resolve=>{
    let  selectedItems   = this._formasDinamicasService[`listarInstituciones`]()
    selectedItems.take(1).subscribe(items=> {
        items.filter(item => {
          let buscarPor:string='';
          this._formasDinamicasService.autoCompleteConfig.institucion.concatBusqueda.forEach(b => {
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
  }*/

  loadData = (event,campo)=> {
         let filter = event.filter;
         let length = event.length;
         let $joinKey:string=null;

           if(this.tipo== 'autorizacion' && campo =='institucion' ){
             //sive para obtener el Key del empleado para asi consultar sus instituciones
               $joinKey= this.forma.get('datos.empleado').value[0]
               }

console.log(filter,length,$joinKey)

               this._formasDinamicasService.filter(filter,campo,$joinKey).then((results:IMultiSelectOption[]) => {
               this._formasDinamicasService.autoCompleteConfig[campo].listado= results
          });
  }


/*loadData = (event)=> {
       let filter = event.filter;
       let length = event.length;
        this._formasDinamicasService.filter(filter).then((results:IMultiSelectOption[]) => {
);
          this.myOptions= results
        });
}*/

volver(){
  return (this._formasDinamicasService.autoCompleteConfig[this.tipo].plural).toLowerCase()
}

dameColunma(){
  this.colunma=!this.colunma
return this.colunma

}
}
