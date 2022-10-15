import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IOrder } from '../../interfaces/i-order';

@Component({
  selector: 'app-order-list-item',
  templateUrl: './order-list-item.component.html',
  styleUrls: ['./order-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderListItemComponent {
  @Input() order!: IOrder;
  @Input() baseViewUrl = '/view-received-order';
}
