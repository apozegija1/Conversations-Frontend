import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ITableConfig} from '../../../shared/models/interfaces/itable-config.interface';
import {CompanyApiService} from '../../services/company-api.service';
import {BehaviorSubject} from 'rxjs';
import {ICompany} from '../../models/icompany.interface';
import {IPageable} from '../../../shared/models/interfaces/ipageable.interface';
import {TableUtils} from '../../utils/table.utils';
import {Router} from '@angular/router';
import {BaseSubscription} from '../../../shared/classes/base-subscription';

@Component({
    templateUrl: './companies-list.component.html',
    styleUrls: ['./companies-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CompaniesListComponent extends BaseSubscription implements OnInit, OnDestroy {
  public companiesTableConfig: ITableConfig = TableUtils.getTableConfig();
  public companies$: BehaviorSubject<ICompany[]> = new BehaviorSubject([]);

  constructor(private companiesApiService: CompanyApiService,
              private router: Router) {
    super();
  }

  ngOnInit() {
    this.getCompanies();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  onView(company: ICompany) {
    this.router.navigate([`/companies/view/${company.id}`]);
  }

  onEdit(company: ICompany) {
    this.router.navigate([`/companies/edit/${company.id}`]);
  }

  onDelete(company: ICompany) {
    this.sink = this.companiesApiService.deleteById(company.id)
      .subscribe((data) => {
      // After delete fetch users again
      this.getCompanies();
    });
  }

  onCreate() {
    this.router.navigate(['/companies/create']);
  }

  private getCompanies() {
    this.sink = this.companiesApiService.get()
      .subscribe(((data: IPageable<ICompany[]>) => {
        this.companies$.next(data.content);
        return data.content;
      }));
  }
}
