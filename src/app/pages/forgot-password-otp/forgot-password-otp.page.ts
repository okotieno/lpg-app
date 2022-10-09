import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { formMixin } from '../../mixins/form.mixin';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';

@Component({
  selector: 'app-forgot-password-otp',
  templateUrl: './forgot-password-otp.page.html',
  styleUrls: ['./forgot-password-otp.page.scss'],

})
export class ForgotPasswordOtpPage extends formMixin() {

  form = this.fb.group({
    token: ['', [Validators.required]
    ],
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
      action: this.authService.confirmPasswordResetOtp,
      successCallback: (res) => {
        console.log({isAuthenticated: this.authService.isAuthenticated.value});
        this.router.navigate(['/password-reset']).then();
      },
    });
  };
}
