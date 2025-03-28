import { Injectable } from '@angular/core';
import { CarrelloComponent } from './carrello.component';

@Injectable({
  providedIn: 'root'
})
export class ServizioCarrelloService {
  
  listaProdottiAggiunti: string[] = []; 

  constructor() { }

  aggiungiProdotto(name: string) {
    this.listaProdottiAggiunti.push(name);
  }

  rimuoviProdotto(name: string): boolean {
    const index = this.listaProdottiAggiunti.indexOf(name);
    if (index > -1) {
      this.listaProdottiAggiunti.splice(index, 1);
      return true;
    }
    return false;
  }
}
