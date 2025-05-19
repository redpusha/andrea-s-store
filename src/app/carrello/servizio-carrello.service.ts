import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CarrelloComponent } from './carrello.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServizioCarrelloService {

  private listaProdottiAggiuntiSubject = new BehaviorSubject<string[] | []>([]);
  listaProdottiAggiunti$: Observable<string[]> = this.listaProdottiAggiuntiSubject.asObservable();

  listaProdottiAggiunti: string[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
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
    // Verifica se siamo in un ambiente browser prima di usare localStorage
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('carrello', JSON.stringify(this.listaProdottiAggiunti)); 
    }
  }

  // una volta salvato, lo carico
  private caricaCarrello() {
    // Inizializza con array vuoto come default
    this.listaProdottiAggiunti = [];
    
    // Verifica se siamo in un ambiente browser prima di usare localStorage
    if (isPlatformBrowser(this.platformId)) {
      const salvato = localStorage.getItem('carrello');
      if (salvato) {
        try {
          this.listaProdottiAggiunti = JSON.parse(salvato);
        } catch (e) {
          console.error('Errore nel parsing del carrello:', e);
        }
      }
    }
    
    // Notifica i subscriber (sia in server che in client)
    this.listaProdottiAggiuntiSubject.next(this.listaProdottiAggiunti);
  }
}
