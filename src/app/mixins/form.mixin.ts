import { BehaviorSubject, Subject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Constructor } from './constructor.mixin';
import { takeUntil } from 'rxjs/operators';
import { OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { LoadingService } from '../services/loading-service/loading.service';
import { AlertService } from '../services/alert-service/alert.service';
import { SnackbarService } from '../services/snackbar-service/snackbar.service';

interface ISubmitObject {
  action: (formValue: any) => any;
  successCallback?: (res?: any) => any;
  errorCallback?: (res: any) => any;
}

export const formMixin = <T extends Constructor>(baseClass: T = class {
} as T) =>
  class extends baseClass implements OnDestroy {
    formBuilder: FormBuilder;
    form: FormGroup;
    formError$ = new BehaviorSubject<{errors: { [id: string]: string }}>(null);
    submitting$ = new BehaviorSubject<boolean>(false);
    destroyed$ = new Subject<void>();
    protected loadingService: LoadingService = new LoadingService(new LoadingController());
    protected alertService: AlertService = new AlertService(new AlertController());
    protected snackbarService: SnackbarService = new SnackbarService(new ToastController());
    action: (formData: any) => any = () => {
    };

    submit = ({action, successCallback, errorCallback}: ISubmitObject) => {
      // this.loadingService.startLoader();
      this.submitting$.next(true);
      action(this.form.value).pipe(
        takeUntil(this.destroyed$)
      ).subscribe({
        next: (res) => {
          if (res.headers?.message) {
            this.snackbarService.success({message: res.headers?.message});
          }
          this.submitting$.next(false);
          // this.loadingService.stopLoader();
          if (successCallback) {
            successCallback(res);
            this.form.reset();
          }
        },
        error: (res: HttpErrorResponse) => {
          this.submitting$.next(false);
          // this.loadingService.stopLoader();
          this.formError$.next(res.error);
          this.alertService.presentAlertError({
            header: res.statusText,
            message: res.error?.message ?? res.message
          });
          if (errorCallback) {
            errorCallback(res);
          }
        }
      });
    };

    ngOnDestroy() {
      this.destroyed$.next();
    }

    // clearFormArray(formArrayControl: FormArray) {
    //   while (formArrayControl.length) {
    //     formArrayControl.removeAt(0);
    //   }
    // }
  };
