import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {UserApiService} from '../../services/user-api.service';
import {IUser} from '../../models/iuser.interface';
import {ITableConfig} from '../../../shared/models/interfaces/itable-config.interface';
import {IPageable} from '../../../shared/models/interfaces/ipageable.interface';
import {BehaviorSubject} from 'rxjs';
import {TableUtils} from '../../utils/table.utils';
import {Router} from '@angular/router';
import {SubSink} from '../../../shared/classes/sub-sink';

@Component({
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsersListComponent implements OnInit, OnDestroy {
  public users$: BehaviorSubject<IUser[]> = new BehaviorSubject([]);
  public userTableConfig: ITableConfig = TableUtils.getTableConfig();
  private subSink = new SubSink();

  constructor(private userApiService: UserApiService,
              private router: Router) {}

  ngOnInit() {
    this.getUsers();
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  onDelete(user: IUser) {
    this.subSink.sink = this.userApiService.deleteById(user.id)
      .subscribe((data) => {
        // After delete fetch users again
        this.getUsers();
    });
  }

  onView(user: IUser) {
    this.router.navigate([`/users/view/${user.id}`]);
  }

  onEdit(user: IUser) {
    this.router.navigate([`/users/edit/${user.id}`]);
  }

  onCreate() {
    this.router.navigate(['/users/create']);
  }

  private getUsers() {
    // Directly assigning this request result to users$ takes to much time on second assignment
     this.subSink.sink = this.userApiService.get()
      .subscribe(((data: IPageable<IUser[]>) => {
        this.users$.next(data.content);
        return data.content;
      }));
  }
}
