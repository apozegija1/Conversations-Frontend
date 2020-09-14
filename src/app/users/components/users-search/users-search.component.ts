import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserApiService} from '../../services/user-api.service';
import {IUser} from '../../models/iuser.interface';
import {IPageable} from '../../../shared/models/interfaces/ipageable.interface';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    templateUrl: './users-search.component.html',
    styleUrls: ['./users-search.component.scss'],
    selector: 'app-users-search',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersSearchComponent implements OnInit {
  public users$: Observable<IUser[]> = new BehaviorSubject([]);

  @Output() selectionChange: EventEmitter<IUser> = new EventEmitter<IUser>();

  constructor(private userApiService: UserApiService) {}

  ngOnInit() {
    this.setUsersForCommunication();
  }

  userDisplay(user: IUser) {
    return user.username;
  }

  setUsersForCommunication(): void {
    this.users$ = this.userApiService.get()
      .pipe(map((data: IPageable<IUser[]>) => data.content));
  }

  selectedUserForCommunication(user: IUser) {
    this.selectionChange.emit(user);
  }
}
