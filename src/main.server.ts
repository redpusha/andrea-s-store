import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;

export const getPrerenderParams = () => {
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
  