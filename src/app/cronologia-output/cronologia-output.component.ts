import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { ServizioService } from '../servizio/servizio.service';
import { Cronologia } from '../models/cronologia.model';

@Component({
  selector: 'app-cronologia-output',
  imports: [],
  templateUrl: './cronologia-output.component.html',
  styleUrl: './cronologia-output.component.css'
})
export class CronologiaOutputComponent implements OnInit{

  @Output() cronologia = new EventEmitter<Cronologia[]>(); 

  constructor (private servizio: ServizioService) {}

  ngOnInit(): void {
    this.cronologia.emit(this.servizio.getCronologia()); 
  }
}
