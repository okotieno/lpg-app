import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Make Order', link: ['pages', 'make-order'], icon: 'mail' },
  ];
  constructor() {}
}
