import { Component, OnInit } from '@angular/core';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order-service/order.service';
import { Observable } from 'rxjs';
import { IOrder } from '../../interfaces/i-order';
import { FormBuilder, Validators } from '@angular/forms';
import { formMixin } from '../../mixins/form.mixin';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';


@Component({
  selector: 'app-dispatch-from-depot',
  templateUrl: './dispatch-from-depot.page.html',
  styleUrls: ['./dispatch-from-depot.page.scss'],
})
export class DispatchFromDepotPage extends formMixin() implements OnInit {
  orderId$ = this.route.paramMap.pipe(
    map((params) => params.get('orderId'))
  );

  form = this.fb.group({
    orderId: [0, [Validators.required]],
  });

  order$: Observable<IOrder> = this.orderId$.pipe(
    tap((orderId) => this.form.get('orderId').setValue(+orderId)),
    switchMap(orderId => this.ordersService.acceptOrder({orderId: +orderId})),
    take(1),
    map(({data}) => data)
  );

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrderService,
    private fb: FormBuilder,
    private router: Router,
    private qrScanner: QRScanner
  ) {
    super();
  }

  ngOnInit() {

  }

  submitOrderAssign() {
    this.submit({
      action: this.ordersService.assignOrder.bind(this.ordersService),
      successCallback: () => {
        this.router.navigate(['/tabs', 'view-received-order', this.form.get('orderId').value]).then();
      }
    });
  }

  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('camera-view');
  }

  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('camera-view');
    console.log((window.document.querySelector('ion-app') as HTMLElement));
    this.qrScanner.show().then(() => {
      console.log('showing');
    }).catch((err) => {
      console.log(err);
    })
    this.qrScanner.scan().subscribe((info) => {
      // {
      //   "id": 1,
      //   "size": 1,
      //   "RFID": "ggg",
      //   "brand": "Gulf Petrochem"
      // }
      this.hideCamera();
    }, (err) => {
      console.log(err);
    });
  }

  scan() {
    this.showCamera(); // Remove
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) {
        this.showCamera();
      } else if (status.denied) {
        alert('Please grant access to Camera');
        // camera permission was permanently denied
        // you must use QRScanner.openSettings() method to guide the user to the settings page
        // then they can grant the permission from there
        this.qrScanner.openSettings();
      } else {
        // permission was denied, but not permanently. You can ask for permission again at a later time.
        this.qrScanner.openSettings();
      }
    });
  }

}
