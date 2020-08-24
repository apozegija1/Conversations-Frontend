import {NavbarService} from '../../shared/services/navbar.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UsersNavbarService {
  constructor(private navbarService: NavbarService) {

    // tslint:disable-next-line:no-console
    console.warn('Create users service');
  }
}
