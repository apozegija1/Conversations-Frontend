import {Component, Input, OnInit} from '@angular/core';
import {IUser} from '../../../users/models/iuser.interface';

@Component({
  templateUrl: './communications-users-info.component.html',
  selector: 'app-communications-users-info',
  styleUrls: ['./communications-users-info.component.scss']
})

export class CommunicationsUsersInfoComponent implements OnInit {
  @Input() users: IUser[] = [];

  constructor() {

  }

  ngOnInit() {

  }
}
