import { Component} from '@angular/core';
import { DescriptivasService } from '../../../services/descriptivas.service';
import { NgForm} from '@angular/forms';
import { DatosComponent } from  '../../../components/edicion/modal/datos.component';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styles: []
})
export class PaisesComponent extends  DatosComponent  {

  titulo:string = 'Paises';
  buscar:string;
  p:any={};

  constructor(public _descriptivasService:DescriptivasService ) {
    super()
		this._descriptivasService.paises = this._descriptivasService.listarPaises();
  }

   buscarPais(){
    this._descriptivasService.paises = this._descriptivasService.buscarPais(this.buscar);
  }
}
