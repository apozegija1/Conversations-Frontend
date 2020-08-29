import {ValidatorUtils} from './validator.utils';

export class FormUtils {
  public static getUserCreateFormConfig() {
    return {
      username: ['', ValidatorUtils.getUsernameValidators()],
      password: ['', ValidatorUtils.getPasswordValidators()],
      firstname: ['', ValidatorUtils.getNameValidators()],
      lastname: ['', ValidatorUtils.getNameValidators()],
      email: ['', ValidatorUtils.getEmailValidators()],
      phone: [null, ValidatorUtils.getPhoneValidators()],
      gender: [null]
    };
  }
}
