import { Component, Input, OnInit} from '@angular/core';
import { DescriptivasService } from '../index.services';
import { FormGroup,FormControl,Validators,FormArray} from '@angular/forms';
import { Formas } from '../../../clases/formas.class';
import {ActivatedRoute ,Router} from '@angular/router';


@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.component.html',
  styles: []
})
export class EdicionComponent implements OnInit {

@Input('tipo') tipo;
@Input('objeto') objeto;
@Input('servicio') servicio;

  operacion:string = "Insertando";
  f:any;
  forma:FormGroup;
  campos:string[];


  constructor(public router: Router,private _descriptivasService:DescriptivasService) {
        this._descriptivasService.empresas = this._descriptivasService.listarEmpresas();
  }

  ngOnInit() {
    this.f = new Formas();
    this.forma = this.f[this.tipo]();
    this.campos =  (this.f[`${this.tipo}Campos`])

    this.servicio[this.tipo].$key =  this.objeto.hasOwnProperty('$key')?this.objeto.$key :null

    if (this.objeto.hasOwnProperty('$key')){
           this.operacion ="Editando";
           this.forma.patchValue({
             $key: this.objeto.$key,
             datos:this.objeto })
           }else
              this.forma.reset();

  }

  guardar(){
       Promise.resolve(this.servicio[`guardar${this.tipo}`](this.forma.value))
         .then((res) => {
          this.forma.patchValue(this.servicio[this.tipo]);
   })
 }
   AgregarEditar(){
     /*console.log(this.empresa.$key,this._empresasService.empresa.$key);*/
     this.servicio[this.tipo].$key =  (this.objeto.$key)?this.objeto.$key :null
     this.servicio[this.tipo].datos = this.objeto;
     /*console.log(this._empresasService.empresa);*/
     this.router.navigate(['/edita',this.tipo]);
 }

 botonMas():boolean{
let masArray:string[]= ['banco','ciudad'];
    return !(masArray.indexOf(this.tipo) > -1)
 }


}
