import { DescriptivasService } from '../../../services/descriptivas.service';
import { Component } from '@angular/core';
import { NgForm} from '@angular/forms';

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styles: []
})
export class CiudadesComponent  {

buscar:string;  
titulo:string='Ciudades'
  constructor(private _descriptivasService:DescriptivasService) {  
		this._descriptivasService.paises = this._descriptivasService.listarPaises();
  }

  buscarCiudad(){
    this._descriptivasService.ciudades = this._descriptivasService.buscarCiudad(this.buscar);
  }

onSelect(value) {
			this._descriptivasService.pais.$key = value;
			this._descriptivasService.ciudades =this._descriptivasService.listarCiudades();
  }


}
