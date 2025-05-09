import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceLoginService } from '../servizioLogin/service-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  errorP = false; 

  constructor (private servizio: ServiceLoginService, private router: Router) {}

  credenziali = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  }); 

  logOnClick () {
    if (this.servizio.logIn(this.credenziali.value.username??'', this.credenziali.value.password??'')) {
      this.router.navigate(['home']); 
    } else {
      this.errorP = true; 
    }
  }

  signup() {
    this.router.navigate(['registrazione']); 
  }
}
