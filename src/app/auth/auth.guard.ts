import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { ServiceLoginService } from '../servizioLogin/service-login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(ServiceLoginService); 
  if (authService.logStatus()) {
    return true;
  } else {
    return false; 
  }
};
