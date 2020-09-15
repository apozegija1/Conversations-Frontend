import {Component, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {StatisticsService} from '../../../statistics/services/statistics.service';
import {AuthenticationService} from '../../../auth/services/authentication.service';
import {BaseUserInfo} from '../../../shared/classes/base-user-info';


@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent extends BaseUserInfo implements OnInit{

  constructor(authService: AuthenticationService,
              private statisticsService: StatisticsService) {
    super(authService);
  }

  public statisticsData$;
  public chartData$;
  public labels: any = [];
  public data: any = [];
  public currentRoleTitles: any;

  private titlesRemainingRoles = { title1: 'agents', title2: 'calls', title3: 'average_call_duration', title4: 'number_of_calls_by_month' };
  // tslint:disable-next-line:max-line-length
  private titlesSuperAgent = { title1: 'users_registered', title2: 'companies_registered', title3: 'users_registered_in_this_year_by_months',
    title4: 'number_of_users_registered_by_months'};

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
  public lineChartType = 'line';
  public lineChartPlugins = [];

  ngOnInit(){

    this.setCurrentUser();

    if (this.authService.isCompanyAdmin()) {
      this.currentRoleTitles = this.titlesRemainingRoles;
    } else if (this.authService.isUser()) {
      this.currentRoleTitles = this.titlesRemainingRoles;
    } else if (this.authService.isAgent()) {
      this.currentRoleTitles = this.titlesRemainingRoles;
    } else {
      this.currentRoleTitles = this.titlesSuperAgent;
    }

    this.statisticsData$ = this.statisticsService.getStats();
    this.chartData$ = this.statisticsService.getStatsForChart();

    this.chartData$.forEach(item => {
        item.forEach(data => {
           this.labels.push(data.month);
           this.data.push(data.number);
        });
    });

  }

}

