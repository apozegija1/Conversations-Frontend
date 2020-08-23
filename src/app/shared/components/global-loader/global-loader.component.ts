import { Component, OnInit } from '@angular/core';

import {LoadingService} from '../../../core/services/loading.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-global-loader',
    templateUrl: './global-loader.component.html',
    styleUrls: ['./global-loader.component.scss']
})
export class GlobalLoaderComponent implements  OnInit {
    loading$: Observable<boolean>;

    constructor(private processManager: LoadingService) { }

    public ngOnInit() {
      this.loading$ = this.processManager.isLoading$();
    }
}
