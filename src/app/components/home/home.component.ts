import { Component, OnInit, Inject} from '@angular/core';
import { IMultiSelectOption,IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { DescriptivasService } from '../../services/descriptivas.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  myForm:FormGroup;
  model: number[];

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


  myOptions: IMultiSelectOption[] = [];

  constructor(private formBuilder: FormBuilder, public _descriptivasService:DescriptivasService) {

    this.filter().then((results:IMultiSelectOption[]) => {
    this.myOptions= results
    console.log('cargando resultados')
    })


   }


      ngOnInit() {


          this.myForm = this.formBuilder.group({
              'optionsModel': [[], Validators.required]
          });


          setTimeout(()=>{
            this.myForm.patchValue({
              'optionsModel':["-KufC6V-ldTWXgS66Auo","-Kv3u32u5_ZAORWaeZWd","-KvDYjNlBD4-hY5TP0PF"]
            }
            )


          }, 0);


          this.myForm.controls['optionsModel'].valueChanges
              .subscribe((selectedOptions) => {
                  // changes
              });
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
