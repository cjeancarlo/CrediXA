import { Injectable } from '@angular/core';
import { PrincipalService } from './principal.service';
import { Cliente } from '../clases/cliente.class';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/Rx';

@Injectable()
export class ClientesService extends  PrincipalService {

  cliente:Cliente = new Cliente();
  items: FirebaseListObservable<any[]>;
  modelo:string = '/clientes';

   //constructor() { }
   buscarCliente(texto:string):FirebaseListObservable<any[]> {
         return this.buscar(texto, this.modelo)
     }

  listarClientes():FirebaseListObservable<any[]>{
        return this.listar(`${this.modelo}`)
        }




        guardarcliente (cliente:Cliente):Promise<string> {
           return Promise.resolve(this.guardar(cliente.datos,this.modelo,cliente.$key))
              .then(($key) => {
                      if(cliente.direccion){
                      this.guardar(cliente.direccion,`${this.modelo}-${this.modeloDetalle[0]}`,$key);
                      }
                      if(cliente.banco){
                      this.guardar(cliente.banco,`${this.modelo}-${this.modeloDetalle[1]}`,$key);
                      }

                    return ($key)
              })
        	}

	eliminarCliente($key:string) {
	     this.eliminar(`${this.modelo}`,`${ $key }`);
       this.eliminar(`${this.modelo}-${this.modeloDetalle[0]}`,`${ $key }`);
       this.eliminar(`${this.modelo}-${this.modeloDetalle[1]}`,`${ $key }`);
	}




}


    /* buscar(texto:string, cantidad:number=10 ){

      let filteredItems:any[] = [];



    this.items =  this.db.list(`${this.modelo}`, { preserveSnapshot: true} );


    this.items.subscribe(snapshots=>{
        snapshots.forEach(snapshot => {
             if( snapshot.val().nombre.toLowerCase().indexOf(texto.toLowerCase()) >=0) {
                    console.log( snapshot); //   filteredItems.push(snapshot);
                }
          //console.log(snapshot.key, snapshot.val());

        });
    })
        console.log(this.items);

     }*/




/*Promise.resolve(this._clientesService.guardarCliente(this.cliente))
    .then((res) => {
        console.log(res); // 123
        return 456;
    })
    .then((res) => {
        console.log(res); // 456
        return Promise.resolve(123); // Notice that we are returning a Promise
    })
    .then((res) => {
        console.log(res); // 123 : Notice that this `then` is called with the resolved value
        return 123;
    })*/



 /*buscar() {
  return this.db.list(`${this.modelo}`)
      .map(_jobs = > _jobs.filter(job => job.price > price));
  }*/
