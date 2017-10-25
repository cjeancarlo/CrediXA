import { Component } from '@angular/core';
import { AutorizacionesService } from '../../services/autorizaciones.service';
import { NgForm} from '@angular/forms';
import { Autorizacion } from '../../clases/autorizacion.class';
import {DatosComponent} from  '../../components/edicion/modal/datos.component';

@Component({
  selector: 'app-autorizaciones',
  templateUrl: './autorizaciones.component.html',
  styles: []
})
export class AutorizacionesComponent extends DatosComponent  {
  titulo:string='Autorizaciones';
  buscar:string;
  au:Autorizacion


  constructor(public _autorizacionesService:AutorizacionesService) {
    super()
        this.au = new Autorizacion();
        this._autorizacionesService.items = this._autorizacionesService.listarAutorizaciones()
      }

  buscarAutorizacion(){
      this._autorizacionesService.items = this._autorizacionesService.buscarAutorizacion(this.buscar);
    }

  }
