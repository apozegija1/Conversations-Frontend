import { Component, OnInit } from '@angular/core';

import {AuthenticationService} from '../../../auth/services/authentication.service';
import {IUser} from '../../models/iuser.interface';

@Component({
    templateUrl: 'user-info.component.html',
    selector: 'app-user-info',
  styleUrls: ['./user-info.component.scss']
})

export class UserInfoComponent implements OnInit {
    public currentUser: IUser;
    public now: Date = new Date();

    constructor(private authService: AuthenticationService) {
      this.currentUser = this.authService.getCurrentUser();
    }

    ngOnInit() {
      setInterval(() => {
        this.now = new Date();
      }, 5000);
    }
}
