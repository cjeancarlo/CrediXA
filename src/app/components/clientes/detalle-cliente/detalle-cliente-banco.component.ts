import { Component, Input,OnInit } from '@angular/core';
import { DescriptivasService } from '../../../services/descriptivas.service';
import { ClientesService } from '../../../services/clientes.service';
import { FormGroup,FormControl,Validators,FormArray} from '@angular/forms';


@Component({
  selector: 'app-detalle-cliente-banco',
  templateUrl: './detalle-cliente-banco.component.html',
  styles: []
})
export class DetalleClienteBancoComponent implements OnInit {

  @Input('forma') forma:FormGroup;
  @Input('bancos') bancos;


    constructor(private _clientesService:ClientesService,private _descriptivasService:DescriptivasService) {
      this._descriptivasService.bancos = this._descriptivasService.listarBancos();
    }


      ngOnInit() { //
        //console.log(this.forma);
        if (this._clientesService.cliente.$key!=null){
            let control = <FormArray>this.forma.controls['banco'];
            var banco:any = this.listarBancos()
            var s:string[] = []
            //console.log('pasando por el constructor')
            //IMPORTANTE TOMAR SOLO VEZ LA DATA Y NO PERMANECER OBSERVANDO //take
            /* extrae la  del detalle data de las banco    */
            banco.take(1).subscribe(
                ds => {
                    ds.map((b,i) =>{
                      //console.log('detalle data de las direcciones',i);
                      control.push(this.initBanco());
                      this._descriptivasService.banco.$key = b.banco;
                          s.push(b)
                      }
                    )
                    control.patchValue(s);
                }),err => console.log(err)
              }else{
                    this.agregarBanco();
              }
            }

      listarBancos(  ){
        return this._descriptivasService.listarDetalles(this._clientesService.modelo,1,this._clientesService.cliente.$key)
      }


      agregarBanco() {
            let control = <FormArray>this.forma.controls['banco'];
           control.push(this.initBanco());
       }

       initBanco() {
         console.log('agregando array de direccion')
          return new FormGroup({
                    'banco':  new FormControl('',[Validators.required]),
                    'cuenta': new FormControl('',[Validators.required]),
          });
      }


      eliminarBanco(i){
      let control = <FormArray>this.forma.controls['banco'];
          this._descriptivasService.eliminarDetalle(this._clientesService.modelo,this._clientesService.cliente.$key, i,1);
          control.removeAt(i);
      }




    }
