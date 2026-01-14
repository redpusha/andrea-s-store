import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'home',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'login',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'registrazione',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'carrello',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'prodotti/:categoria',
    renderMode: RenderMode.Server,
  },
  {
    path: 'prodotti/telefoni/:name',
    renderMode: RenderMode.Server,
  },
  {
    path: 'prodotti/televisori/:name',
    renderMode: RenderMode.Server,
  },
  {
    path: 'prodotti/pc/:name',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
