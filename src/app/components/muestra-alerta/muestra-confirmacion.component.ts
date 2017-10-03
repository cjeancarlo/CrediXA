import { Component, Input } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { AutorizacionesService } from '../../services/autorizaciones.service';
import { DescriptivasService } from '../../services/descriptivas.service';
import { EmpresasService } from '../../services/empresas.service';

@Component({
  selector: 'app-muestra-confirmacion',
  template: `
    <div class="modal fade" id="condfirmacionModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Eliminar </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       esta seguro de eliminar los datos =>  {{objeto.nombre}} {{objeto.$key}}</div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-danger" data-dismiss="modal"
        (click)="eliminarObjeto()">Confirmar</button>
      </div>
    </div>
  </div>
</div>
  `,
  styles: []
})
export class MuestraConfirmacionComponent  {

@Input('objeto') objeto;
@Input('nombre') nombre;
   constructor(private _empresasService:EmpresasService,
               private _autorizacionesService:AutorizacionesService,
               private _clientesService:ClientesService,
               private  _descriptivasService:DescriptivasService) { }


   eliminarObjeto(){



      switch (this.nombre) {
        case 'autorizacion':
        //this._autorizacionesService.eliminarAutorizacion(this.objeto.$key);
        break;
        case 'cliente':
        this._clientesService.eliminarCliente(this.objeto.$key);
        break;
        case 'pais':
        this._descriptivasService.eliminarPais(this.objeto.$key);
        break;
        case 'ciudad':
        this._descriptivasService.eliminarCiudad(this.objeto.$key);
        break;
        case 'banco':
        this._descriptivasService.eliminarBanco(this.objeto.$key);
            break;
        case 'empresa':
        console.log('del emp')
          this._empresasService.eliminarEmpresa(this.objeto.$key);
          break;
     }
   }


   }
