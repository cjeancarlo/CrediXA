import { Component,Input  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Banco } from '../../../clases/banco.class';
import { DescriptivasService } from '../../../services/descriptivas.service';

@Component({
  selector: 'app-banco-edicion-modal',
  templateUrl: './banco-edicion-modal.component.html',
  styles: []
})
export class BancoEdicionModalComponent {
  operacion:string;

  @Input('banco') banco;

  constructor(public _descriptivasService:DescriptivasService) {}


  guardar(){
     this._descriptivasService.banco.$key =  (this.banco.$key)?this.banco.$key :null
     this._descriptivasService.banco.datos = this.banco;
       Promise.resolve(this._descriptivasService.guardarBanco(this._descriptivasService.banco))
         .then((res) => {
          console.log(res);
   })
 }


}
