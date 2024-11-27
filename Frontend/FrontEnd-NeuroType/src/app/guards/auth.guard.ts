import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const routerService = inject(Router);

  const token = authService.getToken();
  console.log(token);

  if(token){
    authService.setToken(token)
    return true
  }else{
    routerService.navigateByUrl('/')
    return false
  }
};
