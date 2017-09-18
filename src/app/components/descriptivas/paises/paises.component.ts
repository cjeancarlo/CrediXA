import { Component} from '@angular/core';
import { DescriptivasService } from '../../../services/descriptivas.service';
import { NgForm} from '@angular/forms';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styles: []
})
export class PaisesComponent  {

  titulo:string = 'Paises';
  buscar:string;


  constructor(private _descriptivasService:DescriptivasService ) { 
		this._descriptivasService.paises = this._descriptivasService.listarPaises();
  }

   buscarPais(){
    this._descriptivasService.paises = this._descriptivasService.buscarPais(this.buscar);
  }
}
