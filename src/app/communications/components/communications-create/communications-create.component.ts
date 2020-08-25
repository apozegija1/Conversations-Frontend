import { Component, OnInit } from '@angular/core';

import {AuthenticationService} from '../../../auth/services/authentication.service';
import {IUser} from '../../../users/models/iuser.interface';

@Component({
    templateUrl: 'communications-create.component.html',
    selector: 'app-user-info',
  styleUrls: ['./communications-create.component.scss']
})

export class CommunicationsCreateComponent implements OnInit {
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
