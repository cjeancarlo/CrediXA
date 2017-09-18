import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-muestra-alerta',
  template: `
 	<div *ngIf="campo.touched">
	<div *ngIf="campo.errors?.required" class="form-control-feedback">
                  <strong>campo requerido</strong>
    </div>
    <div *ngIf="campo.errors?.minlength"  class="form-control-feedback">
                  <strong>minimo requerido es de  {{campo.errors.minlength.requiredLength}}</strong>
    </div>
	<div *ngIf="campo.errors?.pattern" class="form-control-feedback">
               		<strong>Email invalido</strong>
	</div>
	</div>
  `
})
export class MuestraAlertaComponent  {

@Input('campo') campo;
  constructor() {   }
}
