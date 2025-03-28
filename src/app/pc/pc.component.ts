import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServizioService } from '../servizio/servizio.service';
import { Pc } from '../models/pc.model';
import { Router } from '@angular/router';

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

  constructor (private route: ActivatedRoute, private router: Router, private servizio: ServizioService) {}

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get("name");
    const pcs: Pc[] = this.servizio.getListaPc(); 
    pcs.forEach(item => {
      if (item.name === this.name) {
        this.pc = item; 
      }
    })
  };

  backTo () {
    this.router.navigate(['prodotti/pc']); 
  }

}
