import { Component, Input, OnInit} from '@angular/core';
import { FormGroup,FormControl,Validators,FormArray} from '@angular/forms';
import {ActivatedRoute ,Router} from '@angular/router';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../clases/cliente.class';

@Component({
  selector: 'app-cliente-edicion-modal',
  templateUrl: './cliente-edicion-modal.component.html',
  styles: []
})
export class ClienteEdicionModalComponent implements OnInit  {

 operacion:string='Insertando';
 forma:FormGroup ;

@Input('cliente') cliente;
 constructor(public _clientesService:ClientesService,public router: Router) {
   this.forma=  this.clienteForma();
  }

  ngOnInit(){
    this._clientesService.cliente.$key =  (this.cliente.$key)?this.cliente.$key :null
       if (this.cliente.$key!=null)
           {
           this.operacion ="Editando";
           this.forma.patchValue({
             $key: this.cliente.$key,
             datos:this.cliente })
           }else
              this.forma.reset();
    }

    guardar(){
      Promise.resolve(this._clientesService.guardarCliente(this.forma.value))
        .then((res) => {
         this.forma.patchValue(this._clientesService.cliente);
  })
}
  	AgregarEditar(){
      this._clientesService.cliente.$key =  (this.cliente.$key)?this.cliente.$key :null
      this._clientesService.cliente.datos = this.cliente;
  		this.router.navigate(['/cliente']);
	}


  clienteForma():FormGroup {
    return   new FormGroup({
    '$key': new FormControl(),
    'datos' : new FormGroup({
          'codigo': new FormControl('', [Validators.required,Validators.minLength(3)]),
          'nombre': new FormControl('', [Validators.required,Validators.minLength(5)]),
          'email': new FormControl('', [Validators.required,Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]),
          'telefono': new FormControl()
    }),
    'direccion' :new FormArray([

        ]),
    'banco' :new FormArray([

            ])
    });
 }

}
