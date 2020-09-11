import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {LoadingService} from '../../../core/services/loading.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-submit-button',
    templateUrl: './submit-button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubmitButtonComponent implements  OnInit {
    @Input() text: string;

    @Input() isDisabled: boolean;

    public isDataLoading$: Observable<boolean>;

    constructor(private loadingService: LoadingService) { }

    public ngOnInit() {
      this.isDataLoading$ = this.loadingService.isLoading$();
    }
}
