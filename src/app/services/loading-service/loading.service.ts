import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loaderStartRequestCount = 0;
  loading: HTMLIonLoadingElement;

  loader = from(this.loadingController.create({
    spinner: 'lines',
    cssClass: 'loading-wrapper',
    message: 'Please wait...',
  }));

  constructor(public loadingController: LoadingController) {
  }

  startLoader() {
    return this.loader.pipe(
      switchMap(loader => from(loader.present())),
    );
  }

  stopLoader() {
    this.loader.pipe(
      switchMap(loader => from(loader.dismiss())),
    ).subscribe();
  }
}
