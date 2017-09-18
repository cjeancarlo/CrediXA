import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase/app';


@Injectable()
export class AuthService {

  user:any; /* Observable<firebase.User>;/*

  usuario:any={
  }*/


    constructor(public afAuth: AngularFireAuth) {
    /*  this.user = afAuth.authState;

      if  ( localStorage.getItem('usuario')) {
      	this.usuario = JSON.parse(
      		localStorage.getItem('usuario')
      	)
      }else{
      	this.usuario =null;
      }*/
}


registro(formData) {
   if(formData.valid) {
     console.log(formData.value);
     this.afAuth.auth.createUserWithEmailAndPassword(
       formData.value.email,
       formData.value.password
     ).then(
       (success) => {
       console.log(success);
       //this.router.navigate(['/login'])
     }).catch(
       (err) => {
       console.log(err);
       //this.error = err;
     })
   }
 }


  login(userEmail: string, userPassword: string) {
       return new Promise((resolve, reject) => {
         this.afAuth.auth.signInWithEmailAndPassword(userEmail, userPassword)
           .then(userData => {
             resolve(userData)

             this.user = firebase.auth().currentUser;
             /*var name, email, photoUrl, uid, emailVerified;-*/

             if (this.user != null) {
               console.log(this.user.displayName,
               this.user.email,
               this.user.photoURL,
               this.user.emailVerified,
               this.user.uid)  // The user's ID, unique to the Firebase project. Do NOT use
                                // this value to authenticate with your backend server, if
                                // you have one. Use User.getToken() instead.
             }

           },
             err => reject(err));
       });
     }

      logout() {
       return this.afAuth.auth.signOut();
     }


/*login1(proveedor:string) {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
    	data=>{
    			this.usuario = data;
    			console.log(this.usuario);
    			localStorage.setItem("usuario",JSON.stringify(data))
    		}
    	)
    ;
  }

  logout1() {
    this.afAuth.auth.signOut();
	localStorage.removeItem("usuario");
    this.usuario =null;
  }*/
}
