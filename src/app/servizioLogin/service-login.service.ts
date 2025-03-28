import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Utente } from '../models/utente.model';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceLoginService {

  private isLoggedIn = false;
  private userSubject = new BehaviorSubject<Utente | null>(null); 
  user$: Observable<Utente | null> = this.userSubject.asObservable();  
  private user: Utente = {username: "", password: ""}; 
  private signedUpUsers: Utente[] = [{username: "andrea28", password: "12345"}]; 

  logIn (username: string, password: string): boolean {
    this.signedUpUsers.forEach(utente => {
      if (username === utente.username && password === utente.password) {
        this.isLoggedIn = true;
        this.user.username = username; 
        this.user.password = password; 
        this.userSubject.next(this.user); 
      };
    });
    if (this.isLoggedIn) {
      return true; 
    } else {
      return false; 
    }
  };

  logOut (): void {
    this.isLoggedIn = false; 
    this.userSubject.next(null); 
  };

  logStatus (): boolean {
    return this.isLoggedIn; 
  }
}
