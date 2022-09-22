import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IDepot } from '../../interfaces/i-depot';
import { IonicSelectableComponent } from 'ionic-selectable';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';
import { map, tap } from 'rxjs/operators';
import { DepotService } from '../../services/depot-service/depot.service';
import { formMixin } from '../../mixins/form.mixin';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order-service/order.service';
import { BrandsService } from '../../services/brands-service/brands.service';

interface IMakeOrderForm {
  fromDepotId: FormControl<number | null>;
  toDealerId: FormControl<number | null>;
  orderQuantities: FormArray<FormGroup<{
    canisterBrandId: FormControl<number | null>;
    canisterSizeId: FormControl<number | null>;
    quantity: FormControl<number | null>;
  }>>;
}

@Component({
  selector: 'app-make-order-page',
  templateUrl: './make-order-page.page.html',
  styleUrls: ['./make-order-page.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MakeOrderPagePage extends formMixin() implements OnInit {
  // form = this.fb.group({
  //   depotId: [null, [Validators.required]]
  // });

  form = new FormGroup<IMakeOrderForm>({
    toDealerId: new FormControl<number | null>(null, [Validators.required]),
    fromDepotId: new FormControl<number | null>(null, [Validators.required]),
    orderQuantities: new FormArray([])
  });
  dealerStations$ = this.authenticationService.auth$.pipe(
    map((user) => user.stationSpecificRoles.filter(({dealerId}) => !!dealerId)
      .map(({dealerId, dealerName}) => ({dealerId, dealerName}))),
    tap(dealers => {
      if (dealers.length === 1) {
        this.form.get('toDealerId').setValue(dealers[0].dealerId);
      }
    })
  );
  depot: IDepot;
  depots: IDepot[] = [];
  depotsSubscription: Subscription;

  orderQuantities$ = new BehaviorSubject<any[]>([]);

  constructor(
    private depotService: DepotService,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private orderService: OrderService,
    public brandsService: BrandsService
  ) {
    super();
  }

  get orderQuantitiesControl() {
    return this.form.get('orderQuantities') as FormArray;
  }

  ngOnInit() {
    this.addOrder();
  }


  filterDepots(ports: IDepot[], text: string) {
    return ports.filter(port => port.depotName.toLowerCase().indexOf(text) !== -1 ||
      port.depotCode.toLowerCase().indexOf(text) !== -1 ||
      port.depotEPRALicenceNo.toLowerCase().indexOf(text) !== -1 ||
      port.depotCode.toString().toLowerCase().indexOf(text) !== -1);
  }

  searchDealers(event: {
    component: IonicSelectableComponent;
    text: string;
  }) {
    const text = event.text.trim().toLowerCase();
    event.component.startSearch();

    // Close any running subscription.
    if (this.depotsSubscription) {
      this.depotsSubscription.unsubscribe();
    }

    if (!text) {
      // Close any running subscription.
      if (this.depotsSubscription) {
        this.depotsSubscription.unsubscribe();
      }

      event.component.items = [];
      event.component.endSearch();
      return;
    }

    this.depotsSubscription = this.depotService.getItems({
      perPage: 20,
      page: 1,
      searchTerm: text
    }).subscribe(ports => {
      // Subscription will be closed when unsubscribed manually.
      if (this.depotsSubscription.closed) {
        return;
      }

      event.component.items = this.filterDepots(ports.data, text);
      event.component.endSearch();
    });
  }

  changeDepot(event: IDepot) {
    this.depot = event;
    this.form.get('fromDepotId').setValue(event.depotId);
    console.log(event);
  }

  submitOrder() {
    this.submit({
      action: this.orderService.createOrder.bind(this.orderService),
      successCallback: () => {
        this.router.navigate(['/placed-orders']).then();
      }
    });
  }

  addOrder(): void {
    this.orderQuantitiesControl.push(this.fb.group({
      canisterBrandId: [null, [Validators.required]],
      canisterSizeId: [null, [Validators.required]],
      quantity: [null, [Validators.required]]
    }));
  }
}
