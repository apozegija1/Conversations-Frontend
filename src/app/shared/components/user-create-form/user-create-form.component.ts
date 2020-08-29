import {Component, Input, OnInit} from '@angular/core';

import {AuthenticationService} from '../../../auth/services/authentication.service';
import {IUser} from '../../../users/models/iuser.interface';
import {FormGroup} from '@angular/forms';

@Component({
    templateUrl: 'user-create-form.component.html',
    selector: 'app-create-form',
  styleUrls: ['./user-create-form.component.scss']
})

export class UserCreateFormComponent implements OnInit {
    @Input() parentForm: FormGroup;

    constructor() {

    }

    ngOnInit() {
    }
}
