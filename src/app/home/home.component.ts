import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServizioService } from '../servizio/servizio.service';
import { Telefono } from '../models/telefono.model';
import { Televisori } from '../models/televisori.model';
import { Pc } from '../models/pc.model';
import { Cronologia } from '../models/cronologia.model';
import { CronologiaOutputComponent } from '../cronologia-output/cronologia-output.component';
import { ServiceLoginService } from '../servizioLogin/service-login.service';
import { Observable } from 'rxjs';
import { Utente } from '../models/utente.model';
import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, CronologiaOutputComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  nuovaCronologia: Cronologia[] = []; 

  listaTelefoni: Telefono[] = []; 
  listaTelevisori: Televisori[] = []; 
  listaPc: Pc[] = [];

  // array generale per tutti i prodotti
  listaName: string[] = []; 

  // tutti i name dei prodotti
  prodotti: string[] = []; 

  testoRicerca: string = ""; 

  titolo: string = ''; 

  // array tipizzato
  cronologia: { nomeProdotto: string, orario: string }[] = [];  

  constructor (
    private servizio: ServizioService, 
    private router: Router, 
    private route: ActivatedRoute,
  ) {}

  serviceLogin = inject(ServiceLoginService); 
  user$ = this.serviceLogin.user$;

  ngOnInit(): void {
    this.listaTelefoni = this.servizio.getListaTelefoni();
    this.listaTelevisori = this.servizio.getListaTelevisori();
    this.listaPc = this.servizio.getListaPc();

    this.cronologia = this.servizio.getCronologia(); 

    this.listaTelefoni.forEach(telefono => {
      this.prodotti.push(telefono.name); 
    });

    this.listaTelevisori.forEach(televisore => {
      this.prodotti.push(televisore.name); 
    });

    this.listaPc.forEach(pc => {
      this.prodotti.push(pc.name); 
    });
  }; 

  /*
  clickTelefoni (telefono: string) {
    this.router.navigate(['/telefoni', telefono]);
    this.servizio.aggiungiAllaCronologia(telefono); 
    this.cronologia = this.servizio.getCronologia();  
  };
  */

  selezionaCategoria(categoria: string): void {
    // naviga alla pagina dei prodotti della categoria selezionata (se desideri andare a una nuova pagina)
    this.router.navigate(['/prodotti', categoria]);
  }; 

  /*
  onProdottoSelezionato(prodotto: string): void {
    // aggiunge il prodotto alla cronologia
    this.servizio.aggiungiAllaCronologia(prodotto);
    this.cronologia = this.servizio.getCronologia();
    // naviga alla pagina di dettaglio per il prodotto selezionato
    this.router.navigate(['/prodotti', this.categoriaSelezionata, prodotto]);
  }
  */

  verificaAccesso(): boolean {
    return this.serviceLogin.logStatus(); 
  };

  gestisciAccesso(): void {
    if (this.verificaAccesso()) {
      this.serviceLogin.logOut(); 
    }
  };
  
  // const user = this.userService.userSubject.value;

  /* this.userService.user$.subscribe(user => {
  console.log("Utente attuale:", user);
  });*/

  /* this.userService.user$.pipe(take(1)).subscribe(user => {
  console.log("Utente attuale:", user);
  }); */

  get prodottiFiltrati (): string[] {
    if (this.testoRicerca !== "") {
      return this.prodotti.filter(prodotto => prodotto.toLowerCase().includes(this.testoRicerca.toLowerCase())); 
    }
    return []; 
  };

  fromListToDetails(prodotto: string) {
    let categoria = this.servizio.getCategoria(prodotto); 

    this.servizio.aggiungiAllaCronologia(prodotto); 
    this.router.navigate(['/prodotti', categoria, prodotto]);
  };

  vaiAlCarrello () {
    this.router.navigate(['/carrello']); 
  }
  
}
