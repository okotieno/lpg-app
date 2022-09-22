import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication-service/authentication.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.page.html',
  styleUrls: ['./pages.page.scss'],
})
export class PagesPage {
  isDepotUser$ = this.authenticationService.isDepotUser$;
  isDealerUser$ = this.authenticationService.isDealerUser$;

  constructor(private authenticationService: AuthenticationService) {
  }

}
