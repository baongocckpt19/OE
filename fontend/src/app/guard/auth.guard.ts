import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account-service.service';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const accountService = inject(AccountService);

  return accountService.userInfo$.pipe(
    take(1),
    map(user => {
      if (user) {
        return true;
      } else {
        router.navigate(['']);
        return false;
      }
    })
  );
};
