import { Component   } from '@angular/core';
import { EmpresasService } from '../../services/empresas.service';
import { NgForm} from '@angular/forms';
import { Empresa } from '../../clases/empresa.class';
import {DatosComponent} from  '../../components/modal/datos.component';


@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styles: []
})
export class EmpresasComponent extends DatosComponent  {


  titulo:string='Empresas';
	buscar:string;

    constructor(private _empresasService:EmpresasService) {
      super()
      this._empresasService.items = this._empresasService.listarEmpresas();
   }

  buscarCliente(){
    this._empresasService.items = this._empresasService.buscarEmpresa(this.buscar);
  }



}
