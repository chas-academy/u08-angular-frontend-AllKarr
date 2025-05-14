// src/app/auth/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = () => {
  const apiKey = localStorage.getItem('apiKey');
  const router = inject(Router);

  if (apiKey) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};
