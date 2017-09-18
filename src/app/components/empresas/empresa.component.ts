import { Component,OnInit } from '@angular/core';
import { EmpresasService } from '../../services/empresas.service';
import { Empresa } from '../../clases/empresa.class';
import { FormGroup,FormControl,Validators,FormArray} from '@angular/forms';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/take';


@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styles: []
})
export class EmpresaComponent implements OnInit {

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
  formaEmpresa:Empresa= new Empresa();
  operacion:string = "Agregando";
  ciudades:any=[]

    constructor(private _empresasService:EmpresasService) {

      if (this._empresasService.empresa.$key!=null)
          {
          this.operacion ="Editando";
          this.forma.patchValue(this._empresasService.empresa);
          }else{
             this.formaEmpresa= new Empresa();
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
          Promise.resolve(this._empresasService.guardarEmpresa(this.forma.value))
            .then((res) => {
             console.log('respuesta',res);
            this._empresasService.empresa.$key = res;
            this.operacion ="Editando";
            this.forma.patchValue(this._empresasService.empresa);
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



/*  existeUsuario(control:FormControl): Promise<any>|Observable<any>{
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
  }*/
}
