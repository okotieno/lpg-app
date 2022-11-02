import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Self,
  SimpleChanges
} from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';
import { BehaviorSubject, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { AbstractControl, ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-searchable-select',
  templateUrl: './searchable-select.component.html',
  styleUrls: ['./searchable-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchableSelectComponent
  implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {
  @Input() idKey = 'id';
  @Input() labelKey = 'name';
  @Input() service!: any;
  @Input() label = '';
  @Input() multiple = false;
  @Input() placeholder = 'Please select';
  @Input() showDelete = false;
  @Output() removeItem = new EventEmitter();
  @Input() filterOptions: Record<string, unknown> = {};
  isDisabled = false;

  filterSearchChanged$ = new Subject<string>();

  selectedValue: any = null; // number| number[] | null
  selectedValuesBeforeSearch: any = null;
  filters$ = new BehaviorSubject<{ key: string | number; label: string }[]>([]);
  destroyed$ = new Subject();
  private queryParams: any = {page: 1, perPage: 10, searchTerm: ''};

  constructor(
    @Self() @Optional() private control: NgControl
  ) {
    this.control.valueAccessor = this;
  }

  public get required() {
    const control = this.control.control;
    if (control?.validator) {
      const validator = control.validator({} as AbstractControl);
      if (validator && validator.required) {
        return true;
      }
    }
    return false;
  }

  onChanges: (val: string | string[]) => void = () => {
    //
  };
  onTouched: () => void = () => {
    //
  };


  registerOnChange(fn: any): void {
    this.onChanges = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: number | number[]): void {
    if (value && !this.multiple && !Array.isArray(value)) {
      this.selectedValue = {key: value, label: ''};
      this.service
        .getItemWithId(value)
        .pipe(
          map(({data}) => data),
          tap(({[this.idKey]: key, [this.labelKey]: label, ...params}: any) => {
            if (key) {
              this.selectedValue = {key, label};
              this.filters$.next([{key, label}]);
            }
          }),
          take(1),
          catchError(() => this.getItems().pipe(take(1)))
        )
        .subscribe();
    } else if (
      value &&
      this.multiple &&
      Array.isArray(value) &&
      value.length > 0
    ) {
      this.service
        .getItems({perPage: 10, currentPage: 1, ids: value})
        .pipe(
          tap((responseObject: any) => {
            const items =
              responseObject?.data?.map((x) => ({
                key: x?.[this.idKey],
                label: x?.[this.labelKey],
              })) ?? [];
            this.filters$.next(items);
            this.selectedValue = [...items];
          }),
          take(1)
        )
        .subscribe();
    } else {
      this.getItems().pipe(take(1)).subscribe();
    }
  }

  compareWith(
    option: { key: number | string },
    value: { key: number | string }
  ) {
    return !!option && option?.key === value?.key;
  }

  ngOnInit(): void {
    if (this.multiple) {
      this.selectedValue = [];
    }
    this.filterSearchChanged$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap((searchTerm) => {
          this.queryParams = {...this.queryParams, searchTerm};
        }),
        switchMap(() => this.getItems())
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null);
  }

  onSelectedValueRemoved(item: { key: any }) {
    this.selectedValue = [
      ...this.selectedValue.filter(
        ({key}: { key: string }) => key !== item.key
      ),
    ];
    this.onChanges(this.selectedValue.map(({key}: { key: any }) => key));
  }

  selectionChanged($event: any) {
    if (!Array.isArray($event)) {
      this.selectedValue = $event;
      this.onChanges($event.key);
    } else {
      this.selectedValue = [
        ...new Map(
          [...this.selectedValuesBeforeSearch, ...$event].map((item) => [
            item.key,
            item,
          ])
        ).values(),
      ];
      this.selectedValuesBeforeSearch = [];
      this.onChanges($event.map(({key}) => key));
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.filterOptions) {
      this.queryParams = {
        ...this.queryParams,
        ...changes.filterOptions.currentValue,
      };
      this.getItems().pipe(take(1)).subscribe();
    }
  }

  getItems() {
    this.selectedValuesBeforeSearch = this.selectedValue;
    return this.service.getItems({...this.queryParams}).pipe(
      map((responseObject: { data: any[] }) =>
        responseObject?.data?.map(
          ({[this.idKey]: key, [this.labelKey]: label}) => ({
            key,
            label,
          })
        )
      ),
      tap((data) => this.filters$.next(data as any ?? [])),
      takeUntil(this.destroyed$)
    );
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  changeItem($event: any) {
    this.onChanges($event.key);
  }

  searchItems($event: { component: IonicSelectableComponent; text: string }) {
    this.queryParams = {...this.queryParams, searchTerm: $event.text};
    this.getItems().subscribe();
  }
}
