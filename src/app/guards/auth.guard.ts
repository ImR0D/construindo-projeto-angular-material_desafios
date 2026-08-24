import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthenticationService);
  if (authService.isAuthenticated()) {
    return true;
  }
  return false;
};
