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

  constructor() {
    this.caricaCarrello(); 
  }

  aggiungiProdotto(name: string) {
    this.listaProdottiAggiunti = [...this.listaProdottiAggiunti, name];  
    this.notifyAndSave();
  }

  rimuoviProdotto(name: string): boolean {
    const index = this.listaProdottiAggiunti.indexOf(name);
    if (index > -1) {
      this.listaProdottiAggiunti = this.listaProdottiAggiunti.filter((item, i) => i !== index); 
      this.notifyAndSave();  // salva automaticamente
      return true;
    }
    return false;
  }

  private notifyAndSave() {
    this.listaProdottiAggiuntiSubject.next(this.listaProdottiAggiunti);
    this.salvaCarrello();
  }

  // salvo in localStorage per evitare lo svuotamento del carrello dopo il refresh della pagina
  private salvaCarrello() {
    localStorage.setItem('carrello', JSON.stringify(this.listaProdottiAggiunti)); 
  }

  // una volta salvato, lo carico
  private caricaCarrello() {
    const salvato = localStorage.getItem('carrello');
    this.listaProdottiAggiunti = salvato ? JSON.parse(salvato) : []; 
    this.listaProdottiAggiuntiSubject.next(this.listaProdottiAggiunti);  // notifica i subscriber
  }
}
