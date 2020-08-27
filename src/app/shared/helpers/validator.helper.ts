import {ValidationErrors, Validators} from '@angular/forms';
import {PasswordStrengthValidator} from '../validators/password-strength.validator';

export class ValidatorHelper {
  public static getUsernameValidators(maxLength: number = 15): ValidationErrors[] {
    return [Validators.required, Validators.minLength(3), Validators.maxLength(maxLength)];
  }

  public static getNameValidators(maxLength: number = 15): ValidationErrors[] {
    return [Validators.required, Validators.minLength(3), Validators.maxLength(maxLength)];
  }

  public static getPasswordValidators(): ValidationErrors[] {
    return [Validators.required, PasswordStrengthValidator];
  }

  public static getEmailValidators(): ValidationErrors[] {
    return [Validators.required, Validators.email];
  }
}
