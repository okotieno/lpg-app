import { Component } from '@angular/core';
import { formMixin } from '../../mixins/form.mixin';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PASSWORD_RESET_IDENTIFIER } from '../../helpers/constants';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage extends formMixin() {

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
  ) {
    super();
  }

  submitPasswordResetForm = () => {

    this.submit({
      action: this.authService.requestPasswordReset,
      successCallback: async (res) => {
        await Preferences.set({key: PASSWORD_RESET_IDENTIFIER, value: JSON.stringify(res.data)});
        this.router.navigate(['/forgot-password', 'otp']).then();
      },
    });
  };
}
