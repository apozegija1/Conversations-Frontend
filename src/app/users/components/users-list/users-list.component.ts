import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {UserApiService} from '../../services/user-api.service';
import {IUser} from '../../models/iuser.interface';
import {ITableConfig} from '../../../shared/models/interfaces/itable-config.interface';
import {IPageable} from '../../../shared/models/interfaces/ipageable.interface';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TableUtils} from '../../utils/table.utils';
import {Router} from '@angular/router';

@Component({
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsersListComponent implements OnInit {
    public users$: Observable<IUser[]> = new BehaviorSubject([]);
    public userTableConfig: ITableConfig = TableUtils.getTableConfig();

    constructor(private userApiService: UserApiService,
                private router: Router) {}

    ngOnInit() {
      this.getUsers();
    }

    onDelete(user: IUser) {
      this.userApiService.deleteById(user.id)
        .subscribe((data) => {
          // After delete fetch users again
          this.getUsers();
      });
    }

    onEdit(user: IUser) {
      this.userApiService.update(user, user.id)
        .subscribe((data) => {
        this.getUsers();
      });
    }

    onCreate() {
      this.router.navigate(['/users/create']);
    }

    private getUsers() {
      this.users$ = this.userApiService.get()
        .pipe(map((data: IPageable<IUser[]>) => {
          return data.content;
        }));
    }
}
