import { Component } from '@angular/core';
import { InstitucionesService } from '../../services/instituciones.service';
import { NgForm} from '@angular/forms';
import { Institucion } from '../../clases/institucion.class';
import {DatosComponent} from  '../../components/edicion/modal/datos.component';


@Component({
  selector: 'app-instituciones',
  templateUrl: './instituciones.component.html',
  styles: []
})
export class InstitucionesComponent extends DatosComponent  {

titulo:string='Instituciones';
buscar:string;
ins:Institucion


constructor(public _institucionesService:InstitucionesService) {
  super()
      this.ins = new Institucion();

      this._institucionesService.items = this._institucionesService.listarInstituciones()
    }

buscarInstitucion(){
    this._institucionesService.items = this._institucionesService.buscarInstitucion(this.buscar);
  }

}
