import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loaderStartRequestCount = 0;
  loading: HTMLIonLoadingElement;

  constructor(public loadingController: LoadingController) {
  }

  startLoader() {
    if (this.loaderStartRequestCount === 0) {
      // this.show();
    }
    this.loaderStartRequestCount += 1;
  }

  stopLoader() {
    if (this.loaderStartRequestCount === 1) {
      // this.hide();
    }
    this.loaderStartRequestCount -= 1;
  }


  show() {
    (async () => {
      this.loading = await this.loadingController.create({
        spinner: 'lines',
        cssClass: 'loading-wrapper',
        message: 'Please wait...',
      });
      await this.loading.present();
    })();
  };

  hide = () =>  {
      this.loading?.dismiss().then();
  };
}
