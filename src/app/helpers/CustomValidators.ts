import { FormControl, FormGroup } from '@angular/forms';

export class CustomValidators {
  static confirmed = (field = 'password', confirmField = 'passwordConfirmation') => (group: FormGroup) => {
    const matchedPasswords = group.get(field)?.value === group.get(confirmField)?.value;

    return matchedPasswords ? null : {passwordMismatch: true};
  };

  static strongPassword = (group: FormGroup) => {
    const weaknessChecks = [
      {pattern: /.{8,}/, message: 'The Password must contain at least eight characters'},
      {pattern: /[a-z]/, message: 'The Password must contain at least one lower case character'},
      {pattern: /[A-Z]/, message: 'The Password must contain at least one upper case character'},
      {pattern: /[0-9]/, message: 'The Password must contain at least one digit'},
      {pattern: /(?=.*[!@#$%^&*])/, message: 'The Password must contain at least one special character'},
    ];

    const error = weaknessChecks.find(({pattern}) => !pattern.test(group.value));
    if (error) {
      return {weakPassword: error.message};
    }
    return null;
  };

  static atLeastOne = (control: FormControl) => {
    if (control.value?.length < 1) {
      return {minLength: false};
    }
    return null;
  };

  static differentPassword = (oldPasswordField = 'currentPassword', newPasswordField = 'newPassword') => (group: FormGroup) => {
    const matchedPasswords = group.get(oldPasswordField)?.value === group.get(newPasswordField)?.value;

    return !matchedPasswords ? null : {oldAndNewPasswordMatch: true};
  };
}

