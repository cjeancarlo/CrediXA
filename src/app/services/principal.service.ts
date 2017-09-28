import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class PrincipalService {
modeloDetalle:string[]=['direcciones','bancos']
constructor(protected db:AngularFireDatabase) { }


guardar (objeto:any, modelo:string, $key:string):Promise<string> {
console.log(`${ modelo}/${$key}`)
		if (  $key != null  ) {
		console.log('UPDATE ',objeto)
      return new Promise((resolve) => {
            this.db.object(`${ modelo}/${$key}`).update(objeto)
                  .then(item=> {
											resolve($key)
								})
                })
      } else {
    	console.log('INSERT')
       return new Promise((resolve) => {
       this.db.list(`${ modelo }`).push(objeto)
        .then(
        		(item)=> {
								console.log(item);
										console.log('tengoelKey',item.key)
										resolve(item.key);}
        	 )
      })

}
	}



listar(modelo:string,cantidad:number= 10):FirebaseListObservable<any[]>{
        return  this.db.list(`${modelo}`,{
       query:{
        limitToLast:10
            }
       })
      }


		eliminar(modelo:string,$key:string) {
			console.log($key);
			return this.db.list(`${ modelo }`).remove(`${ $key }`);
		}


buscar(texto:string, modelo, cantidad:number=10):FirebaseListObservable<any[]> {
  return this.db.list(`${modelo}`).map(items => {
    const filtrados  = items.filter(item => {
         if(item.nombre.toLowerCase().indexOf(texto.toLowerCase()) >=0) return item;
          });
  return filtrados;
})  as FirebaseListObservable<any[]>;
}

listarDetalles(modelo:string,detalle:number,$key):FirebaseListObservable<any[]>{
	console.log('listarDetalles',detalle,`${modelo}-${this.modeloDetalle[detalle]}/${$key}`);
		return this.listar(`${modelo}-${this.modeloDetalle[detalle]}/${$key}`)
						}

eliminarDetalle(modelo:string,$modeloBaseKey:string,$key:string,indice:number){
	console.log(`${modelo}-${this.modeloDetalle[indice]}/${$modeloBaseKey}`,`${ $key }`);
					    this.eliminar(`${modelo}-${this.modeloDetalle[indice]}/${$modeloBaseKey}`,`${ $key }` );
					  }
}
/*//detalle.forEach((item, index) => {
		console.log(item); // 9, 2, 5
		console.log(index); // 0, 1, 2
	});*/
