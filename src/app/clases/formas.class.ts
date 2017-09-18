import { FormGroup,FormControl,Validators,FormArray} from '@angular/forms';

export class Formas {
tipo:string;


constructor() {

}
botonMas:boolean =true;
forma(tipo:string):FormGroup{
return this[tipo]
}

  empresaCampos:string[] =['codigo','nombre', 'email']
  empresa():FormGroup{
    return new FormGroup({
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

  }

  clienteCampos:string[] =['codigo','nombre', 'email']
  cliente():FormGroup {
    return   new FormGroup({
    '$key': new FormControl(),
    'datos' : new FormGroup({
          'codigo': new FormControl('', [Validators.required,Validators.minLength(3)]),
          'nombre': new FormControl('', [Validators.required,Validators.minLength(5)]),
          'email':  new FormControl('', [Validators.required,Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]),
          'telefono': new FormControl()
    }),
    'direccion' :new FormArray([

        ]),
    'banco' :new FormArray([

            ])
    });
  }

  bancoCampos:string[] =['codigo','nombre']
  banco():FormGroup {
    return   new FormGroup({
    '$key': new FormControl(),
    'datos' : new FormGroup({
          'codigo': new FormControl('', [Validators.required,Validators.minLength(3)]),
          'nombre': new FormControl('', [Validators.required,Validators.minLength(5)])
    })
    });
  }

  ciudadCampos:string[] =['codigo','nombre']
  ciudad():FormGroup {
    return   new FormGroup({
    '$key': new FormControl(),
    'datos' : new FormGroup({
          'codigo': new FormControl('', [Validators.required,Validators.minLength(3)]),
          'nombre': new FormControl('', [Validators.required,Validators.minLength(5)])
    })
    });
  }


}
