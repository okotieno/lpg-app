import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';
import { formMixin } from '../../mixins/form.mixin';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends formMixin() implements OnInit {

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rememberMe: [true]
  });

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    super();
  }

  get email() {
    return this.form.get('email') as FormControl;
  }

  get password() {
    return this.form.get('password') as FormControl;
  }


  ngOnInit(): void {
    this.authenticationService.auth$.subscribe({
      next: (res) => {
        console.log(res);
      }
    });
  }

  submitLogin = () => {
    this.submit({
      action: this.authenticationService.login.bind(this.authenticationService),
      successCallback: () => {
        this.router.navigate(['/dashboard']).then();
      }
    });
  };
}
