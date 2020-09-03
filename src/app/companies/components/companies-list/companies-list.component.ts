import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ITableConfig} from '../../../shared/models/interfaces/itable-config.interface';
import {CompanyApiService} from '../../services/company-api.service';
import {BehaviorSubject} from 'rxjs';
import {ICompany} from '../../models/icompany.interface';
import {IPageable} from '../../../shared/models/interfaces/ipageable.interface';
import {TableUtils} from '../../utils/table.utils';
import {Router} from '@angular/router';
import {SubSink} from '../../../shared/classes/sub-sink';


@Component({
    templateUrl: './companies-list.component.html',
    styleUrls: ['./companies-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CompaniesListComponent implements OnInit {
  public companiesTableConfig: ITableConfig = TableUtils.getTableConfig();
  public companies$: BehaviorSubject<ICompany[]> = new BehaviorSubject([]);
  private subSink = new SubSink();

  constructor(private companiesApiService: CompanyApiService,
              private router: Router) {}

  ngOnInit() {
    this.getCompanies();
  }

  onView(company: ICompany) {
    this.router.navigate([`/companies/view/${company.id}`]);
  }

  onEdit(company: ICompany) {
    this.router.navigate([`/companies/edit/${company.id}`]);
  }

  onDelete(company: ICompany) {

  }

  onCreate() {
    this.router.navigate(['/companies/create']);
  }

  private getCompanies() {
    this.subSink.sink = this.companiesApiService.get()
      .subscribe(((data: IPageable<ICompany[]>) => {
        this.companies$.next(data.content);
        return data.content;
      }));
  }
}
