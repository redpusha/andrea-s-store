import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TelefoniComponent } from './telefoni/telefoni.component';
import { TelevisoriComponent } from './televisori/televisori.component';
import { PcComponent } from './pc/pc.component';
import { LoginComponent } from './login/login.component';
import { HomePageProductComponent } from './home-page-product/home-page-product.component';
import { CarrelloComponent } from './carrello/carrello.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { RenderMode } from '@angular/ssr';

export function getPrerenderParams() {
    const prodotti = {
      telefoni: ['iphone-15', 'galaxy-s23'],
      televisori: ['lg-oled', 'samsung-qled'],
      pc: ['macbook-pro', 'dell-xps'],
    } as const;
  
    const routes: { route: string }[] = [];
  
    for (const categoria of Object.keys(prodotti) as (keyof typeof prodotti)[]) {
      routes.push({ route: `/prodotti/${categoria}` });
  
      for (const nome of prodotti[categoria]) {
        routes.push({ route: `/prodotti/${categoria}/${nome}` });
      }
    }
  
    return routes;
};


export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent}, 
    {path: 'registrazione', component: RegistrazioneComponent},
    // Unica route per tutti i prodotti
    {path: 'prodotti/:categoria', 
        component: HomePageProductComponent, 
        providers: [{ provide: RenderMode, useValue: 'prerender' }]
    },
    {path: 'prodotti/telefoni/:name',
        component: TelefoniComponent,
        providers: [{ provide: RenderMode, useValue: 'prerender' }]
    },
    {path: 'prodotti/televisori/:name', 
        component: TelevisoriComponent,
        providers: [{ provide: RenderMode, useValue: 'prerender' }]
    },
    {path: 'prodotti/pc/:name', 
        component: PcComponent,
        providers: [{ provide: RenderMode, useValue: 'prerender' }]
    },
    {path: 'carrello', 
        component: CarrelloComponent,
        providers: [{ provide: RenderMode, useValue: 'prerender' }]
    }
];

