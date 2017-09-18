import { Component ,Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ActivatedRoute ,Router} from '@angular/router';
import { Pais } from '../../../clases/pais.class';
import { Ciudad } from '../../../clases/ciudad.class';
import { DescriptivasService } from '../../../services/descriptivas.service';


@Component({
  selector: 'app-ciudad-edicion-modal',
  templateUrl: './ciudad-edicion-modal.component.html',
  styles: []
})
export class CiudadEdicionModalComponent  {

	operacion:string;

 @Input('ciudad') ciudad;
 constructor(public _descriptivasService:DescriptivasService,public router: Router) {}

   guardar(){
      this._descriptivasService.ciudad.$key =  (this.ciudad.$key)?this.ciudad.$key :null
      this._descriptivasService.ciudad.datos = this.ciudad;
        Promise.resolve(this._descriptivasService.guardarCiudad(this._descriptivasService.ciudad))
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
