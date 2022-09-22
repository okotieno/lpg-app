import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public alertController: AlertController) { }

  async presentAlertError({ header, message}: {header?: string; message: string}) {
    const alert = await this.alertController.create({
      cssClass: 'error-alert-wrapper',
      header: header ?? 'Error',
      message,
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => true
        }
      ]
    });

    await alert.present();
  }
}
