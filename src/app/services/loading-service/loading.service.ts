import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { from } from 'rxjs';

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

  // startLoader() {
  //     if (this.loaderStartRequestCount === 0) {
  //       this.loader.pipe(
  //         switchMap(loader => from(loader.present())),
  //       ).subscribe();
  //     }
  //     this.loaderStartRequestCount += 1;
  // }
  // stopLoader(){
  //   this.loader.pipe(
  //     switchMap(loader => from(loader.dismiss())),
  //   ).subscribe();
  // }
  async startLoader(url = 'Nothing') {
    console.log('url => ', url);
    if (this.loaderStartRequestCount === 0) {
      this.loading = await this.loadingController.create({
        spinner: 'lines',
        cssClass: 'loading-wrapper',
        message: 'Please wait...',
      });
      await this.loading.present();
      console.log('showing');
    }
    this.loaderStartRequestCount += 1;
  }

  stopLoader() {
    console.log('stopped', this.loaderStartRequestCount);
    if (this.loaderStartRequestCount <= 1) {
      console.log('hiding');
      this.loaderStartRequestCount = 0;
      this.loading?.dismiss().then();
    } else {
      this.loaderStartRequestCount -= 1;
    }
  }


  // async show() {
  //     this.loading = await this.loadingController.create({
  //       spinner: 'lines',
  //       cssClass: 'loading-wrapper',
  //       message: 'Please wait...',
  //     });
  //     await this.loading.present();
  // };
  //
  // hide = () =>  {
  //   console.log('loading', this.loading);
  //     this.loading?.dismiss().then();
  // };
}
