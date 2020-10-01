import {Component, OnDestroy, OnInit} from '@angular/core';

import { AlertService } from '../../services/alert.service';
import {IAlert} from '../../models/interfaces/ialert.interface';
import {BaseSubscription} from '../../classes/base-subscription';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent extends BaseSubscription implements  OnInit, OnDestroy {
    message: IAlert;

    constructor(private alertService: AlertService) {
      super();
    }

    public ngOnInit() {
        this.sink = this.alertService.getMessage()
          .subscribe(message => { this.message = message; });
    }

    public ngOnDestroy() {
      this.unsubscribe();
    }

  public dismissMessage() {
      this.alertService.clear();
    }
}
