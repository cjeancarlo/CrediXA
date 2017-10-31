import { FormGroup,FormControl,Validators,FormArray} from '@angular/forms';
import { Autorizacion } from './autorizacion.class';

export class Formas {
tipo:string;

forma(tipo:string):FormGroup{
  return this[tipo]
}

  empresaCampos:{}[] =[{
                         'nombre':'codigo','tipo':'number','requerido':true,'modal':true
                       },{
                         'nombre':'nombre','tipo':'text','requerido':true,'modal':true
                       },{
                         'nombre':'email','tipo':'email','requerido':true,'modal':true
                       },{
                         'nombre':'telefono','tipo':'text','requerido':true,'modal':true
                       },{
                         'nombre':'direccion','tipo':'ARRAY','modal':false
                       },{
                         'nombre':'banco','tipo':'ARRAY','modal':false
                       }]


  institucionCampos:{}[] =[{
                         'nombre':'codigo','tipo':'number','requerido':true,'modal':true
                       },{
                         'nombre':'nombre','tipo':'text','requerido':true,'modal':true
                       },{
                         'nombre':'email','tipo':'email','requerido':true,'modal':true
                       },{
                         'nombre':'telefono','tipo':'text','requerido':true,'modal':true
                       },{
                         'nombre':'empresa','tipo':'select','requerido':true,'modal':true
                       },{
                         'nombre':'direccion','tipo':'ARRAY','modal':false
                       },{
                         'nombre':'banco','tipo':'ARRAY','modal':false
                       }]

  clienteCampos:{}[] =[{
                         'nombre':'codigo','tipo':'number','requerido':true,'modal':true
                       },{
                         'nombre':'nombre','tipo':'text','requerido':true,'modal':true
                       },{
                         'nombre':'email','tipo':'email','requerido':true,'modal':true
                       },{
                         'nombre':'telefono','tipo':'text','requerido':false,'modal':false
                       },{
                         'nombre':'direccion','tipo':'ARRAY','modal':false
                       },{
                         'nombre':'banco','tipo':'ARRAY','modal':false
                       }]


  bancoCampos:{}[] =[{'nombre':'codigo','tipo':'number','requerido':true,'modal':true},
                     {'nombre':'nombre','tipo':'text','requerido':true,'modal':true}]

  paisCampos:{}[] =[{'nombre':'codigo','tipo':'number','requerido':true,'modal':true},
                    {'nombre':'nombre','tipo':'text','requerido':true,'modal':true}]

  ciudadCampos:{}[] =[{'nombre':'codigo','tipo':'number','requerido':true,'modal':true},
                     {'nombre':'nombre','tipo':'text','requerido':true,'modal':true}]


  autorizacionCampos:{}[] =[{
    'nombre':'nroAut','tipo':'number','requerido':true,'modal':true
  },{
    'nombre':'fecha','tipo':'date','modal':true
  },{
    'nombre':'nroFactura','modal':true
  },{
    'nombre':'monto','tipo':'number','modal':true
  },{
    'nombre':'cuotas','tipo':'number','modal':true
  },{
    'nombre':'pagado','tipo':'number','modal':true
  },{
    'nombre':'empleado','modal':true
  },{
    'nombre':'institucion','modal':true
  },{
    'nombre':'empresa','modal':false
  },{
    'nombre':'cuotas','tipo':'ARRAY','modal':false
  }]

  empleadoCampos:{}[] =[{
    'nombre':'codigo','tipo':'number','requerido':true,'modal':true
  },{
    'nombre':'cedula','tipo':'number','requerido':true,'modal':true
  },{
    'nombre':'nombre','tipo':'text','requerido':true,'modal':true
  },{
    'nombre':'apellido','tipo':'text','requerido':true,'modal':true
  },{
    'nombre':'email','tipo':'email','requerido':true,'modal':true
  } ,{
    'nombre':'institucion','tipo':'selectMultiple','requerido':true,'modal':true
    },{
      'nombre':'banco',
      'tipo':'ARRAY',
      'modal':false

    },{
      'nombre':'direccion',
      'tipo':'ARRAY',
      'modal':false

    }
  ]


direccionDetalleCampos:any[] =[
      {'nombre':'pais','tipo':'select'},
      {'nombre':'ciudad','tipo':'select'},
      {'nombre':'calle','tipo':'text'}
  ]

bancoDetalleCampos:any[] =[
    {'nombre':'banco','tipo':'text'},
    {'nombre':'cuenta','tipo':'text'}
]


cuotasDetalleCampos:any[] =[
    {'nombre':'nroAut','tipo':'number'},
    {'nombre':'fecha','tipo':'date'},
    {'nombre':'montoCuota','tipo':'number'},
    {'nombre':'fechaPagado','tipo':'date'},
    {'nombre':'montoPagado','tipo':'number'},

]


}
