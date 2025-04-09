import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServizioService } from '../servizio/servizio.service';
import { Pc } from '../models/pc.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServizioCarrelloService } from '../carrello/servizio-carrello.service';

@Component({
  selector: 'app-pc',
  imports: [],
  templateUrl: './pc.component.html',
  styleUrl: './pc.component.css'
})
export class PcComponent implements OnInit{

  name: string | null = null;

  pc: Pc = {
    name: '',
    prezzo: 0,
    processore: '',
    categoria: "pc"
  }; 

  listaProdottiAggiunti$!: Observable<string[]>; 

  constructor (
    private route: ActivatedRoute, 
    private router: Router, 
    private servizio: ServizioService,
    private carrello: ServizioCarrelloService
  ) {}

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get("name");
    const pcs: Pc[] = this.servizio.getListaPc(); 
    pcs.forEach(item => {
      if (item.name === this.name) {
        this.pc = item; 
      }
    });

    this.listaProdottiAggiunti$ = this.carrello.listaProdottiAggiunti$; 

  };

  backTo () {
    this.router.navigate(['prodotti/pc']); 
  }

}
