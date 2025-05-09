import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;

export const getPrerenderParams = () => {
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
  