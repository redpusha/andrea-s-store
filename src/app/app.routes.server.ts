import { RenderMode, ServerRoute } from '@angular/ssr';
import { inject } from '@angular/core';
import { ServizioService } from './servizio/servizio.service';

export const serverRoutes: ServerRoute[] = [
  // Static routes
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'home',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'login',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'registrazione',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'carrello',
    renderMode: RenderMode.Prerender
  },
  
  // Dynamic route for product categories
  {
    path: 'prodotti/:categoria',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () => {
      const servizioService = inject(ServizioService);
      
      // Define the categories to prerender
      const categories = ['telefoni', 'televisori', 'pc'];
      
      // Return Promise with array of objects with categoria parameter
      return Promise.resolve(categories.map(categoria => ({ categoria })));
    }
  },
  
  // Dynamic route for individual phone products
  {
    path: 'prodotti/telefoni/:name',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () => {
      const servizioService = inject(ServizioService);
      const listaTelefoni = servizioService.getListaTelefoni();
      
      // Return Promise with array of objects with name parameter
      return Promise.resolve(listaTelefoni.map(telefono => ({ name: telefono.name })));
    }
  },
  
  // Dynamic route for individual TV products
  {
    path: 'prodotti/televisori/:name',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () => {
      const servizioService = inject(ServizioService);
      const listaTelevisori = servizioService.getListaTelevisori();
      
      // Return Promise with array of objects with name parameter
      return Promise.resolve(listaTelevisori.map(televisore => ({ name: televisore.name })));
    }
  },
  
  // Dynamic route for individual PC products
  {
    path: 'prodotti/pc/:name',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () => {
      const servizioService = inject(ServizioService);
      const listaPc = servizioService.getListaPc();
      
      // Return Promise with array of objects with name parameter
      return Promise.resolve(listaPc.map(pc => ({ name: pc.name })));
    }
  },
  
  // Fallback for any other routes
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
