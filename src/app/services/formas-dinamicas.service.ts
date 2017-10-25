import { Injectable } from '@angular/core';
import { FormGroup,FormControl,Validators,FormArray} from '@angular/forms';
import { Formas } from '../clases/formas.class';
import {DescriptivasService} from './descriptivas.service'
import { IMultiSelectOption,IMultiSelectSettings,IMultiSelectTexts } from 'angular-2-dropdown-multiselect';

@Injectable()
export class FormasDinamicasService  extends  DescriptivasService {

  f:Formas;
  campos:any[]=[];
  detalles:any[]=[]

  dameTipo(campo:any):string{
    return (campo.tipo ? campo.tipo :'text' )
  }

  creaForma(tipo:string):FormGroup{
  this.f= new Formas();
  this.campos =this.f[`${tipo}Campos`]

  this.detalles = this.campos.filter(campo => {
    if (campo.tipo =='ARRAY')
      return campo
  })


  console.log(  this.detalles);



  let f:FormGroup=  new FormGroup({
  '$key': new FormControl(),
    'datos' : new FormGroup({})
  })
      const control = <FormGroup>f.controls['datos'];
          Object.values(this.campos).forEach(item=>{
                if (item.tipo == 'ARRAY'){
                    f.addControl(item.nombre, new FormArray([]))
                  }

                  let requerido:FormControl = (item.requerido) ?  new FormControl(null, Validators.required) : new FormControl(null, null)
                    control.addControl(item.nombre,requerido)
                  })
    return f
  }



  myTexts: IMultiSelectTexts = {
      checkAll: 'Todos',
      uncheckAll: 'Ninguno',
      checked: 'seleccionado',
      checkedPlural: 'seleccionados',
      searchPlaceholder: 'Buscar',
      searchEmptyResult: 'ningun resultado...',
      searchNoRenderText: 'Type in search box to see results...',
      allSelected: 'Todas',
  };


  mySettings: IMultiSelectSettings = {
  enableSearch: true,
  //checkedStyle: 'fontawesome',
  //buttonClasses: 'btn btn-default btn-secondary',
  buttonClasses: 'btn btn-primary md-full-width',
  containerClasses: 'md-full-width',
  itemClasses: ' ml-2 ',
  selectionLimit: 1,
  autoUnselect: true,
  closeOnSelect: true,
  //fixedTitle: true,
  //maxHeight: '300px',
  isLazyLoad: true,
  loadViewDistance: 1,
  stopScrollPropagation: true
  };

  filter(texto:string=null,tipo:string,joinKey:string=null){
  let myOptions=[];

  return  new Promise(resolve=>{
 let  options
 if (!joinKey){
             options = this[`listar${this.autoCompleteConfig[tipo].plural}`]()
           }else{
             options = this[`listar${this.autoCompleteConfig[tipo].join}`](joinKey)
 }
      options.take(1).subscribe(items=> {
          items.filter(item => {
            let buscarPor:string='';
            this.autoCompleteConfig[tipo]
               .concatBusqueda.forEach(b => {
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

    }


}
