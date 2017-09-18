import { Component,OnInit } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../clases/cliente.class';
import { FormGroup,FormControl,Validators,FormArray} from '@angular/forms';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styles: []
})
export class ClienteComponent implements OnInit {

forma:FormGroup= new FormGroup({
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
clickeado:boolean = false;
formaCliente:Cliente= new Cliente();
operacion:string = "Agregando";
ciudades:any=[]

  constructor(private _clientesService:ClientesService) {

    if (this._clientesService.cliente.$key!=null)
        {
        this.operacion ="Editando";
        this.forma.patchValue(this._clientesService.cliente);
        }else{
           this.formaCliente= new Cliente();
         }
     }

     ngOnInit() {
       this.onChanges();
     }

     onChanges(): void {
       this.forma.valueChanges.subscribe(val => {
        if(this.clickeado)  this.clickeado= false;
       });
     }


    guardar(){
        Promise.resolve(this._clientesService.guardarCliente(this.forma.value))
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
