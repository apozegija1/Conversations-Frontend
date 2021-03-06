import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {AlertType} from '../models/enums/alert-type.enum';
import {IAlert} from '../models/interfaces/ialert.interface';

@Injectable()
export class AlertService {
    private subject = new Subject<IAlert>();
    private keepAfterNavigationChange = false;

    constructor(private router: Router) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.subject.next();
                }
            }
        });
    }

    success(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: AlertType.Success, text: message });
    }

    error(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: AlertType.Error, text: message });
    }

    clear() {
      this.keepAfterNavigationChange = false;
      this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
