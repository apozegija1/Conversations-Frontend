import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

import {LoadingService} from '../../../core/services/loading.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {delay} from 'rxjs/operators';

@Component({
    selector: 'app-global-loader',
    templateUrl: './global-loader.component.html',
    styleUrls: ['./global-loader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalLoaderComponent implements  OnInit {
    loading$: Observable<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private processManager: LoadingService) { }

    public ngOnInit() {
      // Needed to add delay to avoid change detection after check error
      this.loading$ = this.processManager.isLoading$().pipe(delay(0));
    }
}
