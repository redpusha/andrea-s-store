import { Component } from '@angular/core';
import { ServizioCarrelloService } from './servizio-carrello.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrello',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrello.component.html',
  styleUrl: './carrello.component.css'
})
export class CarrelloComponent {
  constructor(public carrello: ServizioCarrelloService) { }

  get listaProdotti() {
    return this.carrello.listaProdottiAggiunti;
  }

  rimuoviProdotto(prodotto: string) {
    this.carrello.rimuoviProdotto(prodotto);
  }
}
