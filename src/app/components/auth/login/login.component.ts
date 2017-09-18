import { Component, OnInit } from '@angular/core';
import {AuthService} from  '../../../services/auth.service';
import { FormGroup,FormControl,Validators} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  forma:FormGroup= new FormGroup({
      'email': new FormControl('', [Validators.required,Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]),
      'password': new FormControl('', [Validators.required,Validators.minLength(3)]),
      });

constructor(public _authService:AuthService) { }



login() {

  console.log(this.forma.value.email);
  this._authService.login(this.forma.value.email, this.forma.value.password).then((res) => {
    console.log(res);

  })
}

  ngOnInit() {
  }

}
