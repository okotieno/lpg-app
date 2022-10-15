import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IOrder } from '../../interfaces/i-order';

@Component({
  selector: 'app-view-order-item',
  templateUrl: './view-order-item.component.html',
  styleUrls: ['./view-order-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewOrderItemComponent {
  @Input() order!: IOrder;
  @Input() statusTemplate: any;
  @Input() actionsTemplate: any;
  activeTab = 'actions';
}
