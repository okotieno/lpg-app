import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from './services/authentication-service/authentication.service';
import { switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IonMenu } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild(IonMenu) ionMenu: HTMLIonMenuElement;
  public appPages = [
    {title: 'Make Order', link: ['pages', 'make-order'], icon: 'mail'},
  ];

  user$ = this.authenticationService.auth$;
  isAuthenticated$ = this.authenticationService.isAuthenticated;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  logout() {
    this.authenticationService.logout()
      .pipe(
        take(1),
        switchMap(() => this.ionMenu.close()),
        switchMap(() => this.router.navigate(['/login']))
      )
      .subscribe();
  }
}
