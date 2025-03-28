import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Telefono } from '../models/telefono.model';
import { ServizioService } from '../servizio/servizio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-telefoni',
  imports: [],
  templateUrl: './telefoni.component.html',
  styleUrl: './telefoni.component.css'
})
export class TelefoniComponent implements OnInit{

  name: string | null = null; 

  telefono: Telefono = {
    name: '',
    prezzo: 0,
    fotocamera: '',
    categoria: 'telefoni'
  }; 
  
  constructor (private route: ActivatedRoute, private servizio: ServizioService, private router: Router) {}

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('name'); 
    const telefoni: Telefono[] = this.servizio.getListaTelefoni(); 
    telefoni.forEach(item => {
      if (item.name === this.name) {
        this.telefono = item; 
      };
    })
  };

  backTo () {
    this.router.navigate(['/prodotti/telefoni']); 
  }

}
