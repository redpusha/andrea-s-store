import { Component, importProvidersFrom } from '@angular/core';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Utente } from '../models/utente.model';
import { ServiceLoginService } from '../servizioLogin/service-login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrazione',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './registrazione.component.html',
  styleUrl: './registrazione.component.css'
})
export class RegistrazioneComponent {

  error: boolean = false; 

  credenzialiRegistrazione = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    cognome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  nuovoUtente: Utente = {username: '', password: ''}; 

  constructor (
    private servizioLogin: ServiceLoginService,
    private router: Router
  ) {}

  signUp(): boolean {
    if (this.servizioLogin.registrazione(this.credenzialiRegistrazione.value.nome??'', this.credenzialiRegistrazione.value.password??'') 
      && this.credenzialiRegistrazione.value.password != ''
      && this.credenzialiRegistrazione.value.nome != ''
      && this.credenzialiRegistrazione.value.cognome != ''
      && this.credenzialiRegistrazione.value.email != '') {
      this.router.navigate(['home']); 
      return this.error = false; 
    } else {
      return this.error = true; 
    }
  }
}
