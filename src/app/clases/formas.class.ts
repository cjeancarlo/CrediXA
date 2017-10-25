import { FormGroup,FormControl,Validators,FormArray} from '@angular/forms';
import { Autorizacion } from './autorizacion.class';



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
             'email': new FormControl('',  [Validators.required,Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]),
             'telefono': new FormControl(),
             'empresa': new FormControl('', [Validators.required]),
       }),
       'direccion' :new FormArray([

           ]),
       'banco' :new FormArray([

               ])
       });

  }




  clienteCampos:{}[] =[{
                        'nombre':'codigo',
                        'tipo':'number',
                        'requerido':true,
                        'modal':true},
                       {
                        'nombre':'nombre',
                       'tipo':'text',
                       'requerido':true,
                       'modal':true},
                       {
                       'nombre':'email',
                       'tipo':'email',
                       'requerido':true,
                       'modal':true},
                       {
                       'nombre':'telefono',
                       'tipo':'text',
                       'requerido':false,
                       'modal':false},
                        {
                        'nombre':'direccion',
                        'tipo':'ARRAY',
                        'modal':false
                        },{
                          'nombre':'banco',
                          'tipo':'ARRAY',
                          'modal':false

                        }]

  /*cliente():FormGroup {
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
  }*/

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

  autorizacionCampos:{}[] =[{
    'nombre':'nroAut',
    'tipo':'number',
    'requerido':true,
    'modal':true
  },{
    'nombre':'fecha',
    'tipo':'date',
    'modal':true
  },{
    'nombre':'nroFactura',
    'modal':true
  },{
    'nombre':'monto',
    'tipo':'number',
    'modal':true
  },{
    'nombre':'cuotas',
    'tipo':'number',
    'modal':true
  },{
   'nombre':'pagado',
   'tipo':'number',
   'modal':true
 },{
   'nombre':'empleado',
   'modal':true
},{
   'nombre':'institucion',
   'modal':true
},{
   'nombre':'empresa',
   'modal':false
},{
  'nombre':'cuotas',
  'tipo':'ARRAY',
  'modal':false

}]



  empleadoCampos:string[] =['codigo','cedula','nombre', 'apellido']
  empleado():FormGroup {
    return   new FormGroup({
    '$key': new FormControl(),
    'datos' : new FormGroup({
          'codigo': new FormControl('', [Validators.required]),
          'nombre': new FormControl('', [Validators.required,Validators.minLength(5)]),
          'apellido': new FormControl('', [Validators.required,Validators.minLength(5)]),
          'cedula': new FormControl('', [Validators.required]),
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


cuotasDetalleCampos:any[] =[
    {'campo':'nroAut','tipo':'number'},
    {'campo':'fecha','tipo':'date'},
    {'campo':'montoCuota','tipo':'number'},
    {'campo':'fechaPagado','tipo':'date'},
    {'campo':'montoPagado','tipo':'number'},

]
cuotasDetalle():FormGroup {
  return new FormGroup({
            'nroAut':  new FormControl('',[Validators.required]),
            'fecha': new FormControl('',[Validators.required]),
            'montoCuota': new FormControl('',[Validators.required]),
            'fechaPagado': new FormControl(''),
            'montoPagado': new FormControl(''),
  });
}


}
