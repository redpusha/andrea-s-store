import { Injectable } from '@angular/core';
import { CarrelloComponent } from './carrello.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServizioCarrelloService {

  private listaProdottiAggiuntiSubject = new BehaviorSubject<string[] | []>([]);
  listaProdottiAggiunti$: Observable<string[]> = this.listaProdottiAggiuntiSubject.asObservable();

  listaProdottiAggiunti: string[] = [];

  constructor() { }

  aggiungiProdotto(name: string) {
    this.listaProdottiAggiunti.push(name);
    this.listaProdottiAggiuntiSubject.next(this.listaProdottiAggiunti); 
  }

  rimuoviProdotto(name: string): boolean {
    const index = this.listaProdottiAggiunti.indexOf(name);
    if (index > -1) {
      this.listaProdottiAggiunti.splice(index, 1);
      this.listaProdottiAggiuntiSubject.next(this.listaProdottiAggiunti); 
      return true;
    }
    return false;
  }
}
