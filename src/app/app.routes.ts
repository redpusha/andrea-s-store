import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TelefoniComponent } from './telefoni/telefoni.component';
import { TelevisoriComponent } from './televisori/televisori.component';
import { PcComponent } from './pc/pc.component';
import { LoginComponent } from './login/login.component';
import { HomePageProductComponent } from './home-page-product/home-page-product.component';
import { CarrelloComponent } from './carrello/carrello.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent}, 
    {path: 'registrazione', component: RegistrazioneComponent},
    // Unica route per tutti i prodotti
    {path: 'prodotti/:categoria', component: HomePageProductComponent},
    {path: 'prodotti/telefoni/:name', component: TelefoniComponent},
    {path: 'prodotti/televisori/:name', component: TelevisoriComponent},
    {path: 'prodotti/pc/:name', component: PcComponent},
    {path: 'carrello', component: CarrelloComponent}
];
