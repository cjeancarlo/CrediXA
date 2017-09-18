import { Component ,ViewChild  } from '@angular/core';
import { EmpresasService } from '../../services/empresas.service';
import { NgForm} from '@angular/forms';
import { Empresa } from '../../clases/empresa.class';
import { EmpresaEdicionModalComponent } from '../../components/empresas/empresa-edicion-modal.component';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styles: []
})
export class EmpresasComponent{
@ViewChild(EmpresaEdicionModalComponent) hijo: EmpresaEdicionModalComponent;
  titulo:string='Empresas';
	buscar:string;

    constructor(private _empresasService:EmpresasService) {
      this._empresasService.items = this._empresasService.listarEmpresas();
   }

  buscarCliente(){
    this._empresasService.items = this._empresasService.buscarEmpresa(this.buscar);
  }

 MuestraDatosModal(empresa){
  if(this.hijo){//evita error de render
  this.hijo.operacion ="Editando";
  this.hijo.forma.patchValue({
    $key: empresa.$key,
    datos:empresa })
  }
   /*Promise.resolve(this.forma.controls.datos.patchValue(this.empresa).then((res) => { })*/
}

LimpiaDatosModal(){
 if(this.hijo){//evita error de render
 this.hijo.forma.reset();
 this.hijo.operacion ="Insertando";
 }
}

}
