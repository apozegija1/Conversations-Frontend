import {Component, Input, OnInit} from '@angular/core';

import { AlertService } from '../../services/alert.service';
import {LoadingService} from '../../../core/services/loading.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-submit-button',
    templateUrl: './submit-button.component.html'
})
export class SubmitButtonComponent implements  OnInit {
    @Input() text: string;

    public isDataLoading$: Observable<boolean>;

    constructor(private loadingService: LoadingService) { }

    public ngOnInit() {
      this.isDataLoading$ = this.loadingService.isLoading$();
    }
}
