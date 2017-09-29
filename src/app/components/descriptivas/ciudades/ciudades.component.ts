import { DescriptivasService } from '../../../services/descriptivas.service';
import { Component } from '@angular/core';
import { NgForm} from '@angular/forms';
import {DatosComponent} from  '../../../components/edicion/modal/datos.component';
@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styles: []
})

export class CiudadesComponent extends  DatosComponent   {

buscar:string;
titulo:string='Ciudades'
selectPais:string;
c:any ={};
  constructor(public _descriptivasService:DescriptivasService) {
    super()
    this._descriptivasService.pais.$key = null;
    this._descriptivasService.ciudades[0]=null;
		this._descriptivasService.paises = this._descriptivasService.listarPaises();
  }

  buscarCiudad(){
    this._descriptivasService.ciudades[0] =this._descriptivasService.buscarCiudad(this.buscar);
  }

onSelect(value) {
			this._descriptivasService.pais.$key = value;
			this._descriptivasService.ciudades[0] = this._descriptivasService.listarCiudades();
  }


}
