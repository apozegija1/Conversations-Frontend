import {ValidationErrors, Validators} from '@angular/forms';
import {PasswordStrengthValidator} from '../validators/password-strength.validator';

export class ValidatorUtils {
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

  public static getPhoneValidators(): ValidationErrors {
    return Validators.pattern(new RegExp('[0-9 ]{11,12}'));
  }
}
