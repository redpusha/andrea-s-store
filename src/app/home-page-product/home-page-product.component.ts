import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServizioService } from '../servizio/servizio.service';
import { CommonModule } from '@angular/common';
import { ServizioCarrelloService } from '../carrello/servizio-carrello.service';
import { Observable } from 'rxjs';
import { count } from 'console';

@Component({
  selector: 'app-home-page-product',
  imports: [CommonModule],
  templateUrl: './home-page-product.component.html',
  styleUrl: './home-page-product.component.css',
})
export class HomePageProductComponent implements OnInit {

  categoria: string = '';
  name: string = '';

  // array che conterrà SOLO i nomi dei prodotti 
  listaName: string[] = [];

  @Input() prodotti: string[] = [];
  @Input() titolo: string = '';

  @Output() prodottoSelezionato = new EventEmitter<any>();

  listaProdottiAggiunti!: string[];

  listaMap: { name: string, count: number }[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servizio: ServizioService,
    private carrello: ServizioCarrelloService,
  ) { }

  ngOnInit(): void {
    // legge i parametri della rotta
    this.categoria = this.route.snapshot.paramMap.get('categoria') || '';
    // this.name = this.route.snapshot.paramMap.get('name') || 'list';
    this.loadProductList();

    this.carrello.listaProdottiAggiunti$.subscribe(lista => {
      this.listaProdottiAggiunti = lista;
      this.aggiornaListaMap(); // funzione che aggiorna i count da lista
    });

    /*
    // #TODO -> migliora il codice con i for-of 
    this.listaName.forEach(name => {
      var count: number = 0;
      for (let i = 0; i < this.listaProdottiAggiunti.length; i++) {
        if (name == this.listaProdottiAggiunti[i]) {
          count++;
        }
      }
      this.listaMap.push({ name, count });
    })
    */
  };

  selezionaProdotto(prodotto: any): void {
    this.prodottoSelezionato.emit(prodotto);
  };

  loadProductList(): void {
    this.listaName = [];
    switch (this.categoria) {
      case 'telefoni':
        this.titolo = 'Telefoni';
        this.servizio.getListaTelefoni().forEach(prod => this.listaName.push(prod.name));
        break;
      case 'televisori':
        this.titolo = 'Televisori';
        this.servizio.getListaTelevisori().forEach(prod => this.listaName.push(prod.name));
        break;
      case 'pc':
        this.titolo = 'Pc';
        this.servizio.getListaPc().forEach(prod => this.listaName.push(prod.name));
        break;
      default:
        this.listaName = [];
        this.titolo = 'Prodotti';
    }
  };

  onProductClick(prodotto: string): void {
    // this.prodottoSelezionato.emit(prodotto);
    this.servizio.aggiungiAllaCronologia(prodotto);
    this.router.navigate(['/prodotti', this.categoria, prodotto]);
  };

  aggiungiAlCarrello(prodotto: string) {
    this.carrello.aggiungiProdotto(prodotto); 
  };

  getImmagine(prodotto: string): string {
    return this.servizio.getImmagineProdotto(prodotto);
  }

  getCountFromProduct(product: string): number {
    var exist: boolean = false;
    let count: number = 0;
    this.listaMap.forEach(map => {
      if (product == map.name) {
        exist = true;
        count = map.count;
      }
    })
    return exist ? count : 0;
  };

  aggiornaListaMap(): void {
    this.listaMap = [];
    for (const name of this.listaName) {
      const count = this.listaProdottiAggiunti.filter(p => p === name).length;
      if (count > 0) {
        this.listaMap.push({ name, count });
      }
    }
  };

  callRimuoviElemento(name: string) {
    this.carrello.rimuoviProdotto(name); 
  }
}
