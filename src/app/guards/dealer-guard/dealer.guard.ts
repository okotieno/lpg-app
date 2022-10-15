import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';
import { distinctUntilChanged, filter, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DealerGuard implements CanLoad {
  constructor(private authService: AuthenticationService, private router: Router) {
  }

  canLoad(): Observable<boolean> | boolean | Promise<UrlTree> {
    return this.authService.isDealerUser$.pipe(
      distinctUntilChanged(),
      filter(val => val !== null), // Filter out initial Behaviour subject value
      map(isDealerUser => {
        if (isDealerUser) {
          return true;
        } else {
          this.router.navigateByUrl('/').then();
        }
      })
    );
  }
}
