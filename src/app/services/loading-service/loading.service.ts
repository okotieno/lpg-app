import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { from, Observable } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loaderStartRequestCount = 0;
  loading: HTMLIonLoadingElement;

  loader: Observable<HTMLIonLoadingElement> | null = null;

  constructor(public loadingController: LoadingController) {
  }

  startLoader() {
    if(this.loader) {
      return this.loader.pipe(
        switchMap(loader => from(loader.present())),
      );
    }
    this.loader = from(this.loadingController.create({
      spinner: 'lines',
      cssClass: 'loading-wrapper',
      message: 'Please wait...',
    }));
    return this.loader.pipe(
      switchMap(loader => from(loader.present())),
    );
  }

  stopLoader() {
    if (this.loader) {
      this.loader.pipe(
        switchMap(loader => from(loader.dismiss())),
        finalize(() => {
          this.loader = null;
        })
      ).subscribe();
    }
  }
}
