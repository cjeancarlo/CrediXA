import { Component,OnInit } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
//import { Cliente } from '../../clases/cliente.class';
import { Formas } from '../../clases/formas.class';
import { FormGroup,FormControl,Validators,FormArray} from '@angular/forms';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styles: []
})
export class ClienteComponent implements OnInit {
f:Formas
forma:FormGroup

clickeado:boolean = false;
/*formaCliente:Cliente= new Cliente();*/
operacion:string = "Agregando";
ciudades:any=[]

  constructor(private _clientesService:ClientesService) {}

     ngOnInit() {
       this.f = new Formas();
       this.forma = this.f.cliente();

       if (this._clientesService.cliente.$key!=null)
           {
           this.operacion ="Editando";
           this.forma.patchValue(this._clientesService.cliente);
         }/*else{
              this.formaCliente= new Cliente();
            }*/
            this.onChanges();
     }

     onChanges(): void {
       this.forma.valueChanges.subscribe(val => {
        if(this.clickeado)  this.clickeado= false;
       });
     }


    guardar(){
        Promise.resolve(this._clientesService.guardarcliente(this.forma.value))
          .then((res) => {
           console.log('respuesta',res);
          this._clientesService.cliente.$key = res;
          this.operacion ="Editando";
          this.forma.patchValue(this._clientesService.cliente);
          this.clickeado= true
    })
}

	reset(){
		this.operacion = "Agregando";
    this.resetDetalle('direccion')
    this.resetDetalle('banco')
	}

resetDetalle(grupoDetalle:string){
  const control = <FormArray>this.forma.controls[grupoDetalle];
  let len = control.length;
  if (len > 1)
    console.log('borrando')
      for (var i = len - 1; i > 0; i--)
      control.removeAt(i);
      this.forma.reset();
}



existeUsuario(control:FormControl): Promise<any>|Observable<any>{
  let promesa = new Promise(
    (resolve , reject)=>{
        setTimeout( ()=>{
              if (control.value === 'caracas'){
                resolve ({existe:true})
              }else {
                resolve (null)
              }
        },3000 )
    })
  return promesa;
}








}
