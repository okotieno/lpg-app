import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ForgotPasswordOtpPage } from './forgot-password-otp.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OtpModule } from '../../../components/otp/otp.module';

describe('ForgotPasswordOtpPage', () => {
  let component: ForgotPasswordOtpPage;
  let fixture: ComponentFixture<ForgotPasswordOtpPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordOtpPage ],
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        OtpModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordOtpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
