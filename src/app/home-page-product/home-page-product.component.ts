import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServizioService } from '../servizio/servizio.service';
import { CommonModule } from '@angular/common';
import { ServizioCarrelloService } from '../carrello/servizio-carrello.service';

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

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private servizio: ServizioService,
    private carrello: ServizioCarrelloService
  ) { }

  ngOnInit(): void {
    // legge i parametri della rotta
    this.categoria = this.route.snapshot.paramMap.get('categoria') || '';
    // this.name = this.route.snapshot.paramMap.get('name') || 'list';
    this.loadProductList(); 
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

  aggiungiAlCarrello(name: string) {
    this.carrello.aggiungiProdotto(name);
  }
}
