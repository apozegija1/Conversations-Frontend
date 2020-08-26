import { AbstractControl, ValidationErrors } from '@angular/forms';

export const PasswordStrengthValidator = (control: AbstractControl): ValidationErrors | null => {
  const value: string = control.value || '';

  if (!value) {
    return null;
  }

  if (value.length < 8) {
    return { passwordStrength: `Password has to contain at least 8 characters,current value ${value}` };
  }

  const upperCaseCharacters = /[A-Z]+/g;
  if (upperCaseCharacters.test(value) === false) {
    return { passwordStrength: `Password has to contain Upper case characters,current value ${value}` };
  }

  const lowerCaseCharacters = /[a-z]+/g;
  if (lowerCaseCharacters.test(value) === false) {
    return { passwordStrength: `Password has to contain lower case characters,current value ${value}` };
  }


  const numberCharacters = /[0-9]+/g;
  if (numberCharacters.test(value) === false) {
    return { passwordStrength: `Password has to contain number characters,current value ${value}` };
  }

  const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if (specialCharacters.test(value) === false) {
    return { passwordStrength: `Password has to contain special character,current value ${value}` };
  }
  return null;
};
