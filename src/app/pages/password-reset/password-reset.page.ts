import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { formMixin } from '../../mixins/form.mixin';
import { CustomValidators } from '../../helpers/CustomValidators';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage extends formMixin() {

  form = this.fb.group({
    password: ['', [Validators.required, CustomValidators.strongPassword]],
    passwordConfirmation: ['', [Validators.required]],
  }, {validators: [CustomValidators.confirmed()]});

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
  ) {
    super();
  }

  get passwordConfirmationControl() {
    return this.form.get('passwordConfirmation') as FormControl;
  }

  get passwordControl() {
    return this.form.get('password') as FormControl;
  }

  submitLogin = () => {
    this.submit({
      action: this.authService.passwordChange,
      successCallback: () => {
        this.router.navigate(['/dashboard']).then();
      }
    });
  };
}
