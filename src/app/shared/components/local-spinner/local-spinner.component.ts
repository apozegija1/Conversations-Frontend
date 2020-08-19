import { Component, OnInit } from '@angular/core';

import {ProcessManagerService} from '../../../core/services/process-manager.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-local-spinner',
    templateUrl: './local-spinner.component.html'
})
export class LocalSpinnerComponent implements  OnInit {
    loading$: Observable<boolean>;

    constructor(private processManager: ProcessManagerService) { }

    public ngOnInit() {
      this.loading$ = this.processManager.isLoading$();
    }
}
