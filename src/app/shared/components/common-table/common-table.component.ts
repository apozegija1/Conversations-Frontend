import { Component, OnInit } from '@angular/core';

import {TranslateService} from '@ngx-translate/core';
import {Constants} from '../../models/constants';
import {LocalStorageService} from '../../services/local-storage.service';
import {ILanguageItem} from '../../models/interfaces/ilanguage-item.interface';

@Component({
    templateUrl: 'common-table.component.html',
    selector: 'app-common-table',
    styleUrls: ['./common-table.component.scss']
})

export class CommonTableComponent implements OnInit {
    ngOnInit() {

    }
}
