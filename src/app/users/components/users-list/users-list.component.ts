import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsersListComponent implements OnInit {


    constructor() {

    }

    ngOnInit() {

    }
}
