import { FormGroup,FormControl,Validators,FormArray} from '@angular/forms';

export class Formas {
tipo:string;




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


  institucionCampos:string[] =['codigo','nombre', 'email','empresa']
  institucion():FormGroup{
    return new FormGroup({
       '$key': new FormControl(),
       'datos' : new FormGroup({
             'codigo': new FormControl('', [Validators.required,Validators.minLength(3)]),
             'nombre': new FormControl('', [Validators.required,Validators.minLength(5)]),
             'email': new FormControl('', [Validators.required,Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]),
             'telefono': new FormControl(),
             'empresa': new FormControl('', [Validators.required]),
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


  paisCampos:string[] =['codigo','nombre']
  pais():FormGroup {
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

  autorizacionCampos:string[] =['nroAut','fecha','nroFactura','monto', 'cuotas','pagado',
  'empleado','institucion']
  autorizacion():FormGroup {
    return   new FormGroup({
    '$key': new FormControl(),
    'datos' : new FormGroup({
          'nroAut': new FormControl(''),
          'fecha': new FormControl('', [Validators.required]),
          'nroFactura': new FormControl('', [Validators.required,Validators.minLength(1)]),
          'monto': new FormControl('', [Validators.required,Validators.minLength(3)]),
          'cuotas': new FormControl('', [Validators.required,Validators.minLength(3)]),
          'pagado': new FormControl(''),
          'institucion': new FormControl('', [Validators.required]),
          'empresa': new FormControl(''),
          'empleado': new FormControl('', [Validators.required]),
    }),
    'cuotas' :new FormArray([

        ])
    });
  }

  empleadoCampos:string[] =['codigo','cedula','nombre', 'apellido']
  empleado():FormGroup {
    return   new FormGroup({
    '$key': new FormControl(),
    'datos' : new FormGroup({
          'codigo': new FormControl('', [Validators.required]),
          'cedula': new FormControl('', [Validators.required]),
          'nombre': new FormControl('', [Validators.required,Validators.minLength(5)]),
          'apellido': new FormControl('', [Validators.required,Validators.minLength(5)]),
          'email': new FormControl('', [Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]),
          'instituciones': new FormControl([''],Validators.required)
    }),
    'banco' :new FormArray([

        ]),
    'direccion' :new FormArray([

        ])
    });
  }

  direccionDetalleCampos:any[] =[
      {'campo':'pais','tipo':'select'},
      {'campo':'ciudad','tipo':'select'},
      {'campo':'calle','tipo':'text'}
  ]
  direccionDetalle():FormGroup {
  return new FormGroup({
            'pais':   new FormControl('',[Validators.required]),
            'ciudad': new FormControl('',[Validators.required]),
            'calle':  new FormControl('',[Validators.required])
  });
}

bancoDetalleCampos:any[] =[
    {'campo':'banco','tipo':'text'},
    {'campo':'cuenta','tipo':'text'}
]
bancoDetalle():FormGroup {
  return new FormGroup({
            'banco':  new FormControl('',[Validators.required]),
            'cuenta': new FormControl('',[Validators.required]),
  });
}
}
