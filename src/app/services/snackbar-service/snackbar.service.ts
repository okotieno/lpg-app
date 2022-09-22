import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private toastController: ToastController) { }

  success({message}: {message: string}) {
    (async () => {
      const toast = await this.toastController.create({
        message,
        duration: 4000,
        color: 'success'
      });
      toast.present().then();
    })();
  }
}
