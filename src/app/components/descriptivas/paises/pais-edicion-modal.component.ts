import { Component,Input  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Pais } from '../../../clases/pais.class';
import { Ciudad } from '../../../clases/ciudad.class';
import { DescriptivasService } from '../../../services/descriptivas.service';


@Component({
  selector: 'app-pais-edicion-modal',
  templateUrl: './pais-edicion-modal.component.html',
  styles: []
})
export class PaisEdicionModalComponent  {

	operacion:string;

 @Input('pais') pais;
 constructor(public _descriptivasService:DescriptivasService) {}

   guardar(){
      this._descriptivasService.pais.$key =  (this.pais.$key)?this.pais.$key :null
      this._descriptivasService.pais.datos = this.pais;
        Promise.resolve(this._descriptivasService.guardarPais(this._descriptivasService.pais))
          .then((res) => {
           console.log(res);
    })
	}

/*  	AgregarEditar(){
      this._clientesService.cliente.$key =  (this.cliente.$key)?this.cliente.$key :null
      this._clientesService.cliente.datos = this.cliente;
  		this.router.navigate(['/cliente']);
	}*/

}
