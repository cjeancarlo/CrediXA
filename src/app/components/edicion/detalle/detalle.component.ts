import { Component, Input,OnInit } from '@angular/core';
import { Formas } from '../../../clases/formas.class';
import { DescriptivasService } from '../../../services/descriptivas.service';
import { FormGroup,FormControl,Validators,FormArray} from '@angular/forms';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  objectKeys = Object.keys;
  f:any = new Formas();
  @Input('forma') forma:FormGroup;
  @Input('padre') padre;
  @Input('tipo') tipo;
  @Input('tipoDetalle') tipoDetalle;
  campos:string[];
  rango:any[]=[]

  constructor(public  _descriptivasService:DescriptivasService) {

  }

  ngOnInit() {
    let VerificaSiAgregoTipo:boolean = false;

    //busca que campos tiene la forma a mostrar
    this.campos= this.f[`${this.tipoDetalle}DetalleCampos`]

    //console.log('ngOnInit', typeof this.padre[this.tipo].$key,(typeof this.padre[this.tipo].$key !== "undefined"))
        if (/*this.padre[this.tipo].$key!==null || */
            typeof this.padre[this.tipo].$key !== "undefined"){
        //  console.log('buscando datos para mostrar');
      let control = <FormArray>this.forma.controls[this.tipoDetalle];
      let Verifica:boolean =false;
      var registros:any = this.listarTipos()
      var s:string[] = []
      //console.log('pasando por el constructor')
      //IMPORTANTE TOMAR SOLO VEZ LA DATA Y NO PERMANECER OBSERVANDO //take
      /* extrae la  del detalle data de las registros    */
      registros.take(1).subscribe(
          ds => {
              ds.map((d,i) =>{
                console.log(this.tipo,this.padre[this.tipo].$key)
                control.push(this.initTipo());
                if(d.pais){
                          //si el detalle tiene el campo
                          //o objeto pais carga la data de los DropDowns
                this._descriptivasService.pais.$key = d.pais;
                this._descriptivasService.ciudades[i]=this._descriptivasService.listarCiudades();

              }

                    s.push(d);
                    this.rango.push(0);
                    VerificaSiAgregoTipo= true;
                }
              )



                  control.patchValue(s);
              //si el padre no tiene detalle agrega un formGroup
              //vacio por defecto en caso de que este agregando comportamiento por defecto
              //si por alguna razon el padre no tiene detalle
                if (!VerificaSiAgregoTipo) this.rango.push(0); this.agregarTipo();
          })
        }else{
              this.agregarTipo();
        }
      }


      onSelect(value,i) {
          this._descriptivasService.pais.$key = value;
          this._descriptivasService.ciudades[i] =this._descriptivasService.listarCiudades();
      }


      listarTipos(){
        console.log(this.tipoDetalle,this._descriptivasService.modeloDetalle.indexOf(this.tipoDetalle))
        //implementacion asquerosa mejorar
        let t:number = this.tipoDetalle=='banco'?1:0;
        //

        return this._descriptivasService
        .listarDetalles(
            this.padre.modelo,
            t,
            this.padre[this.tipo].$key
          )
      }

      agregarTipo() {
            let control = <FormArray>this.forma.controls[this.tipoDetalle];
           control.push(this.initTipo());
       }

       initTipo() {
        return this.f[`${this.tipoDetalle}Detalle`]();
      }

       eliminarTipo(i){
       let control = <FormArray>this.forma.controls[this.tipoDetalle];
       console.log(this.padre.modelo,this.padre[this.tipo].$key, i,0);
           this._descriptivasService.eliminarDetalle(this.padre.modelo,this.padre[this.tipo].$key, i,this.tipoDetalle);
           control.removeAt(i);
       }






}