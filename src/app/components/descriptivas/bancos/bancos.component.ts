import { Component} from '@angular/core';
import { DescriptivasService } from '../../../services/descriptivas.service';
import { NgForm} from '@angular/forms';


@Component({
  selector: 'app-bancos',
  templateUrl: './bancos.component.html',
  styles: []
})
export class BancosComponent  {

  titulo:string = 'Bancos';
  buscar:string;


  constructor(private _descriptivasService:DescriptivasService ) {
		this._descriptivasService.bancos = this._descriptivasService.listarBancos();
  }

   buscarBanco(){
    this._descriptivasService.bancos = this._descriptivasService.buscarBanco(this.buscar);
  }

}
