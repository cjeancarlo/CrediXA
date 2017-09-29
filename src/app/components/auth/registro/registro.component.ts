import { Component, OnInit } from '@angular/core';
import {AuthService} from  '../../../services/auth.service';
import { FormGroup,FormControl,Validators} from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: []
})
export class RegistroComponent implements OnInit {
formData:any;

    forma:FormGroup= new FormGroup({
        'nombre': new FormControl('', [Validators.required]),
        'email': new FormControl('', [Validators.required,Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]),
        'password': new FormControl('', [Validators.required,Validators.minLength(3)]),
        });

  constructor(public _authService:AuthService) { }

  ngOnInit() {}




}
