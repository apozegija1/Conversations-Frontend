import {ValidatorUtils} from './validator.utils';
import {IUser} from '../../users/models/iuser.interface';

export class FormUtils {
  public static getUserCreateFormConfig(user: IUser = null, disabled: boolean = false) {
    let username = '', password = '', firstname = '', lastname = '', email = '', phone = null, gender = null;
    let passwordDisabled = disabled;
    if (user) {
      username = user.username;
      password = user.password;
      passwordDisabled = true;
      firstname = user.firstname;
      lastname = user.lastname;
      email = user.email;
      phone = user.phone;
      gender = user.gender;
    }

    return {
      username: [{value: username, disabled }, ValidatorUtils.getUsernameValidators()],
      password: [{value: password, disabled: passwordDisabled }, ValidatorUtils.getPasswordValidators()],
      firstname: [{value: firstname, disabled }, ValidatorUtils.getNameValidators()],
      lastname: [{value: lastname, disabled }, ValidatorUtils.getNameValidators()],
      email: [{value: email, disabled }, ValidatorUtils.getEmailValidators()],
      phone: [{value: phone, disabled }, ValidatorUtils.getPhoneValidators()],
      gender: [{value: gender, disabled }]
    };
  }
}
