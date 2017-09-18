
import { Component, Input, OnInit} from '@angular/core';
import { FormGroup,FormControl,Validators,FormArray} from '@angular/forms';
import { EmpresasService } from '../../services/empresas.service';
import {ActivatedRoute ,Router} from '@angular/router';
import { Empresa } from '../../clases/empresa.class';

@Component({
  selector: 'app-empresa-edicion-modal',
  templateUrl: './empresa-edicion-modal.component.html',
  styles: []
})
export class EmpresaEdicionModalComponent  implements OnInit {

   operacion:string = "Insertando";;
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

@Input('empresa') empresa;
   constructor(public _empresasService:EmpresasService,public router: Router) {

      }

ngOnInit(){
  this._empresasService.empresa.$key =  (this.empresa.$key)?this.empresa.$key :null
     if (this.empresa.$key!=null)
         {
         this.operacion ="Editando";
         this.forma.patchValue({
           $key: this.empresa.$key,
           datos:this.empresa })
         }else
            this.forma.reset();
  }
     guardar(){
          Promise.resolve(this._empresasService.guardarEmpresa(this.forma.value))
            .then((res) => {
             this.forma.patchValue(this._empresasService.empresa);
      })
  }
    	AgregarEditar(){
        /*console.log(this.empresa.$key,this._empresasService.empresa.$key);*/
        this._empresasService.empresa.$key =  (this.empresa.$key)?this.empresa.$key :null
        this._empresasService.empresa.datos = this.empresa;
        /*console.log(this._empresasService.empresa);*/
    		this.router.navigate(['/empresa']);
  	}

}
