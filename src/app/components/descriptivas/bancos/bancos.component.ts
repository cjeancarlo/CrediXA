import { Component} from '@angular/core';
import { DescriptivasService } from '../../../services/descriptivas.service';
import { NgForm} from '@angular/forms';
import {DatosComponent} from  '../../../components/edicion/modal/datos.component';

@Component({
  selector: 'app-bancos',
  templateUrl: './bancos.component.html',
  styles: []
})
export class BancosComponent extends  DatosComponent  {

  titulo:string = 'Bancos';
  buscar:string;
  b:any ={};

  constructor(public _descriptivasService:DescriptivasService ) {
    super()
		this._descriptivasService.bancos = this._descriptivasService.listarBancos();
  }

   buscarBanco(){
    this._descriptivasService.bancos = this._descriptivasService.buscarBanco(this.buscar);
  }

}
