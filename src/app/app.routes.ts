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
import { ServizioService } from './servizio/servizio.service';

export function getPrerenderParams() {
    const prodotti = {
    telefoni: ['iphone 16', 'galaxy s24'],
    televisori: ['lg', 'philips'],
    pc: ['hp', 'mac'],
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
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registrazione', component: RegistrazioneComponent },
    {
        path: 'prodotti/:categoria',
        component: HomePageProductComponent,
        providers: [{ provide: RenderMode, useValue: 'prerender' }],
        data: {
            prerender: true,
            getPrerenderParams: () => {
                const servizioService = new ServizioService();
                const listaTelefoni = servizioService.getListaTelefoni();
                const listaTelevisori = servizioService.getListaTelevisori();
                const listaPc = servizioService.getListaPc();

                const routes = [
                    ...listaTelefoni.map(telefono => ({ categoria: 'telefoni', name: telefono.name })),
                    ...listaTelevisori.map(televisore => ({ categoria: 'televisori', name: televisore.name })),
                    ...listaPc.map(pc => ({ categoria: 'pc', name: pc.name }))
                ];

                return routes.map(route => ({ categoria: route.categoria }));
            }
        }
    },
    {
        path: 'prodotti/telefoni/:name',
        component: TelefoniComponent,
        providers: [{ provide: RenderMode, useValue: 'prerender' }],
        data: {
            prerender: true,
            getPrerenderParams: () => {
                const servizioService = new ServizioService();
                const listaTelefoni = servizioService.getListaTelefoni();
                return listaTelefoni.map(telefono => ({ name: telefono.name }));
            }
        }
    },
    {
        path: 'prodotti/televisori/:name',
        component: TelevisoriComponent,
        providers: [{ provide: RenderMode, useValue: 'prerender' }],
        data: {
            prerender: true,
            getPrerenderParams: () => {
                const servizioService = new ServizioService();
                const listaTelevisori = servizioService.getListaTelevisori();
                return listaTelevisori.map(televisore => ({ name: televisore.name }));
            }
        }
    },
    {
        path: 'prodotti/pc/:name',
        component: PcComponent,
        providers: [{ provide: RenderMode, useValue: 'prerender' }],
        data: {
            prerender: true,
            getPrerenderParams: () => {
                const servizioService = new ServizioService();
                const listaPc = servizioService.getListaPc();
                return listaPc.map(pc => ({ name: pc.name }));
            }
        }
    },
    {
        path: 'carrello',
        component: CarrelloComponent,
        providers: [{ provide: RenderMode, useValue: 'prerender' }]
    }
];

