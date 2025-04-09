import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Televisori } from '../models/televisori.model';
import { ServizioService } from '../servizio/servizio.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServizioCarrelloService } from '../carrello/servizio-carrello.service';


@Component({
  selector: 'app-televisori',
  imports: [],
  templateUrl: './televisori.component.html',
  styleUrl: './televisori.component.css'
})
export class TelevisoriComponent implements OnInit{

  name: string | null = null; 

  televisore: Televisori = {
    name: '',
    prezzo: 0,
    display: '',
    categoria: "televisori"
  };

  listaProdottiAggiunti$!: Observable<string[]>; 

  constructor (
    private route: ActivatedRoute, 
    private servizio: ServizioService, 
    private router: Router,
    private carrello: ServizioCarrelloService
  ) {}

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get("name");
    const televisori: Televisori[] = this.servizio.getListaTelevisori(); 
    televisori.forEach(item => {
      if (item.name === this.name) {
        this.televisore = item;
      }
    });

    this.listaProdottiAggiunti$ = this.carrello.listaProdottiAggiunti$; 

  };

  backTo () {
    this.router.navigate(['/prodotti/televisori']); 
  }
}
