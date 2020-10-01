import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {StatisticsApiService} from '../../../shared/services/api/statistics-api.service';
import {AuthenticationService} from '../../../auth/services/authentication.service';
import {BaseUserInfo} from '../../../shared/classes/base-user-info';
import {Observable, Subject} from 'rxjs';
import {IOverview} from '../../../shared/models/interfaces/ioverview.interface';
import {IChartOverview} from '../../../shared/models/interfaces/ichart-overview.interface';
import {RoleTranslationService} from '../../../shared/services/role-translation.service';
import {RoleTranslationType} from '../../../shared/models/enums/role-translation-type.enum';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent extends BaseUserInfo implements OnInit, OnDestroy {

  constructor(authService: AuthenticationService,
              private statisticsService: StatisticsApiService,
              private roleTranslationService: RoleTranslationService) {
    super(authService);
  }

  public statisticsData$: Observable<IOverview[]> = new Subject();
  public labels: string[] = [];
  public data: number[] = [];
  public currentRoleTitles: any;

  public lineChartData: ChartDataSets[] = [
      { data: this.data, label: '' },
  ];
  public lineChartLabels: Label[] = this.labels;
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    annotation: undefined,
    responsive: true
  };
  public lineChartColors: Color[] = [
    {
      borderColor: '#6bd098',
      backgroundColor: '#EC7629',
    },
  ];

  public lineChartLegend = false;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  ngOnInit() {
    this.setCurrentUser();
    this.currentRoleTitles = this.roleTranslationService.getTranslation(RoleTranslationType.Home);

    this.statisticsData$ = this.statisticsService.getOverview();
    this.sink = this.statisticsService.getChartOverview()
      .subscribe((items: IChartOverview[]) => {
        for (let i = 1; i <= 12; i++) {
          const item = items.find((chartOverview: IChartOverview) => chartOverview.number === i);
          if (item != null) {
            this.labels.push(item.month);
            this.data.push(item.number);
          } else {
            this.labels.push('');
            this.data.push(0);
          }
        }
    });
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}

