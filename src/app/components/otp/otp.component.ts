import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { timer } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OtpComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => OtpComponent),
      multi: true
    }
  ]
})
export class OtpComponent implements ControlValueAccessor, OnInit {

  @ViewChild('inputItems') inputItems;

  @Input() otpDigits = 6;
  values = [];

  get otp() {
    let otp = '';
    for (let i = 0; i < this.otpDigits; i += 1) {
      otp += this.inputItems?.nativeElement?.querySelectorAll('input')[i].value;
    }
    return otp;
  }

  onChanges: (val: string) => void = () => {
  };
  onTouched: () => void = () => {
  };

  registerOnChange(fn: any): void {
    this.onChanges = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    const updateUi = () => {
      let empty = true;
      timer(50, 50).pipe(
        tap((count) => {
          const inputs = this.inputItems.nativeElement.querySelectorAll('input');
          if (inputs.length > 0) {
            for (let i = 0; i < this.otpDigits; i += 1) {
              inputs[i].value = obj?.[i] ? obj[i] : '';
            }
            empty = false;
          } else if (count > 80) {
            empty = false;
          }
        }),
        takeWhile(() => empty)
      ).subscribe();
    };
    updateUi();
  }

  ngOnInit(): void {
    this.values = Array(this.otpDigits).fill('');
  }

  setDisabledState(isDisabled: boolean): void {
  }

  moveCursor($event, i: number) {
    $event.preventDefault();

    if (/^\d/.test($event.key)) {
      console.log($event.key);
      this.inputItems.nativeElement.querySelectorAll('input')[i].value = $event.key;
      if (i < this.otpDigits - 1) {
        this.inputItems.nativeElement.querySelectorAll('input')[i + 1].focus();
      }
    }

    if (/^Backspace/.test($event.key)) {
      this.inputItems.nativeElement.querySelectorAll('input')[i].value = '';
      if (i > 0) {
        this.inputItems.nativeElement.querySelectorAll('input')[i - 1].focus();
      }
    }

    this.onChanges(this.otp);
  }

  identity = (index: number) => index;

  validate() {
    return this.otp.length === this.otpDigits ? null : {minLength: true};
  }

  pasteContent($event) {
    $event.preventDefault();
    const obj = $event.clipboardData.getData('Text');
    if (!RegExp(`^\\d{${this.otpDigits},${this.otpDigits}}$`).test(obj)) {
      return;
    }
    const inputs = this.inputItems.nativeElement.querySelectorAll('input');
    for (let i = 0; i < this.otpDigits; i += 1) {
      inputs[i].value = obj[i] ? obj[i] : '';
      inputs[i].focus();
    }

  }
}
