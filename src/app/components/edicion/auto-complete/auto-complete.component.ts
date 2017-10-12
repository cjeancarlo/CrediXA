import { Component, OnInit,Input } from '@angular/core';
import { DescriptivasService } from '../index.services';
import { FormGroup,FormControl,Validators,FormArray} from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styles: []
})
export class AutoCompleteComponent implements OnInit {

  @Input('campo') campo:string;
  @Input('forma') forma:FormGroup;

  servicio:any;
  constructor(public _descriptivasService:DescriptivasService ) { }

  ngOnInit() {
//console.log(this.campo);
    this.servicio = this._descriptivasService.autoCompleteConfig[this.campo]
    //console.log(this.campo,this.servicio);
    this.forma.get(`datos.${this.campo}`).valueChanges.subscribe(val => {
       let valor = (val != null &&   typeof val==='object') ? val.nombre : val;
       this._descriptivasService[this.servicio.plural] = this.filter(valor);
   });

  }


  filter(texto):FirebaseListObservable<any[]>{
    /*console.log("FILTER",texto);*/
      return texto == null ? //trae todos
      this._descriptivasService[`listar${this.servicio.plural}`]() : //filtra
      this._descriptivasService[`listar${this.servicio.plural}`]().map(items => {
        const filtrados  = items.filter(item => {
  /*            console.log(item.cedula, texto);*/
  let buscarPor:string='';
    this.servicio.concatBusqueda.forEach(b => {
    buscarPor +=`${item[b]} `;
  })
  if(buscarPor.toLowerCase().indexOf(texto.toLowerCase()) >=0 /*||
              item.cedula.indexOf(texto) >=0*/
           ) return item;
              });
      return filtrados;
    })  as FirebaseListObservable<any[]>;
    }

    displayFn(item):string {
      if  (item != null &&   typeof item==='object') {
        this.servicio.$key = item.$key;
          return this.displayOption(item)
          }
      return  item;

    }

    displayOption(item){
      let display:string="";
      this.servicio.concatBusqueda.forEach(b => {
      display +=`${item[b]} `;
      })
        return display;
    }

}
