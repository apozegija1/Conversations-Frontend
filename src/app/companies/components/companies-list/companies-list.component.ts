import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ITableConfig} from '../../../shared/models/interfaces/itable-config.interface';
import {CompanyApiService} from '../../services/company-api.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {ICompany} from '../../models/icompany.interface';
import {map} from 'rxjs/operators';
import {IPageable} from '../../../shared/models/interfaces/ipageable.interface';
import {TableUtils} from '../../utils/table.utils';
import {Router} from '@angular/router';

@Component({
    templateUrl: './companies-list.component.html',
    styleUrls: ['./companies-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CompaniesListComponent implements OnInit {
  public companiesTableConfig: ITableConfig = TableUtils.getTableConfig();
  public companies$: Observable<ICompany[]> = new BehaviorSubject([]);

  constructor(private companiesApiService: CompanyApiService,
              private router: Router) {}

  ngOnInit() {
    this.companies$ = this.companiesApiService.get()
      .pipe(map((data: IPageable<ICompany[]>) => {
        return data.content;
    }));
  }

  onEdit(company: ICompany) {

  }

  onDelete(company: ICompany) {

  }

  onCreate() {
    this.router.navigate(['/companies/create']);
  }
}
