import { Component, Input,OnInit } from '@angular/core';
import { DescriptivasService } from '../../services/descriptivas.service';
import { FormGroup,FormControl,Validators,FormArray} from '@angular/forms';


@Component({
  selector: 'app-detalle-direccion',
  templateUrl: './detalle-direccion.component.html',
  styles: []
})
export class DetalleDireccionComponent implements OnInit {

  @Input('forma') forma:FormGroup;
  @Input('ciudades') ciudades;
  @Input('padre') padre;
  @Input('tipo') tipo;

  constructor(private _descriptivasService:DescriptivasService) {
    this._descriptivasService.paises = this._descriptivasService.listarPaises();
    this._descriptivasService.ciudades = null;
  }

  ngOnInit() {
    console.log(this.tipo,this.padre[this.tipo])
    if (this.padre[this.tipo].$key!=null){  let control = <FormArray>this.forma.controls['direccion'];
      var direcciones:any = this.listarDirecciones()
      var s:string[] = []
      //console.log('pasando por el constructor')
      //IMPORTANTE TOMAR SOLO VEZ LA DATA Y NO PERMANECER OBSERVANDO //take
      /* extrae la  del detalle data de las direcciones    */
      direcciones.take(1).subscribe(
          ds => {
              ds.map((d,i) =>{
                //console.log('detalle data de las direcciones',i);
                control.push(this.initDireccion());
                this._descriptivasService.pais.$key = d.pais;
                this.ciudades[i] =this._descriptivasService.listarCiudades();
                    s.push(d)
                }
              )
              control.patchValue(s);
          })
        }else{
              this.agregarDireccion();
        }
      }

onSelect(value,index) {
    this._descriptivasService.pais.$key = value;
    this.ciudades[index] =this._descriptivasService.listarCiudades();
}


listarDirecciones(  ){
  return this._descriptivasService.listarDetalles(this.padre.modelo,0,this.padre[this.tipo].$key)
}

agregarDireccion() {
      let control = <FormArray>this.forma.controls['direccion'];
     control.push(this.initDireccion());
 }

 initDireccion() {
   console.log('agregando array de direccion')
    return new FormGroup({
              'pais':   new FormControl('',[Validators.required]),
              'ciudad': new FormControl('',[Validators.required]),
              'calle':  new FormControl('',[Validators.required])
    });
}



 eliminarDireccion(i){
 let control = <FormArray>this.forma.controls['direccion'];
     this._descriptivasService.eliminarDetalle(this.padre.modelo,this.padre[this.tipo].$key, i,0);
     control.removeAt(i);
 }
 }
