import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, take } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanLoad {
  constructor(private authService: AuthenticationService, private router: Router) {
  }

  canLoad(): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(
      distinctUntilChanged(),
      filter(val => val !== null), // Filter out initial Behaviour subject value
      map(isAuthenticated => {

        if(!isAuthenticated) {
          return true;
        }
        this.router.navigate(['/dashboard']).then();
        return false;
      })
    );
  }
}
