import { Component } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { NgForm} from '@angular/forms';
import { Cliente } from '../../clases/cliente.class';
import {DatosComponent} from  '../../components/modal/datos.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: []
})
export class ClientesComponent extends DatosComponent {
  titulo:string='Clientes';
	buscar:string;

    constructor(private _clientesService:ClientesService) {
super()
      this._clientesService.items = this._clientesService.listarClientes();
   }

  buscarCliente(){
    this._clientesService.items = this._clientesService.buscarCliente(this.buscar);
  }

}
