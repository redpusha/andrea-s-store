import { Injectable } from '@angular/core';
import { Telefono } from '../models/telefono.model';
import { Televisori } from '../models/televisori.model';
import { Pc } from '../models/pc.model';
import { Cronologia } from '../models/cronologia.model';

@Injectable({
  providedIn: 'root'
})
export class ServizioService {

  private cronologia: Cronologia[] = [];
  private categoria: string = ''; 

  constructor() {}

  getListaTelefoni (): Telefono[] {
    return [
      {name: "iphone 16", prezzo: 1700, fotocamera: "90Mpx", categoria: "telefoni"},
      {name: "samsung s24", prezzo: 1500, fotocamera: "120Mpx", categoria: "telefoni"}
    ]; 
  };

  getListaTelevisori (): Televisori[] {
    return [
      {name: "lg", prezzo: 2500, display: "oled", categoria: "televisori"},
      {name: "philips", prezzo: 1600, display: "qoled", categoria: "televisori"}
    ];
  };

  getListaPc (): Pc[] {
    return [
      {name: "hp", prezzo: 600, processore: "ryzen", categoria: "pc"},
      {name: "mac", prezzo: 1700, processore: "apple m1", categoria: "pc"}
    ]
  };
  
  aggiungiAllaCronologia (nomeProdotto: string) {
    const orarioCorrente = new Date().toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute : '2-digit',
      second: '2-digit'
    }); 
    this.cronologia.unshift({nomeProdotto, orario: orarioCorrente}); 
  };
  
  getCronologia () {
    return this.cronologia; 
  };

  getCategoria (name: string): string {
    let listaTelefoni = this.getListaTelefoni(); 
    let listaTelevisori = this.getListaTelevisori();
    let listaPc = this.getListaPc();

    this.categoria = ''; 

    listaTelefoni.forEach(telefono => {
      if (telefono.name == name) {
        this.categoria = telefono.categoria; 
      }
    });

    listaTelevisori.forEach(televisore => {
      if (televisore.name == name) {
        this.categoria = televisore.categoria; 
      }
    });

    listaPc.forEach(pc => {
      if (pc.name == name) {
        this.categoria = pc.categoria; 
      }
    }); 

    return this.categoria; 
  }
}
