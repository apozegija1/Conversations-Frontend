import {Component, OnInit} from '@angular/core';
import * as Chart from 'chart.js';
import {StatisticsService} from '../../../statistics/services/statistics.service';
import {IRole} from '../../../users/models/irole.interface';
import {AuthenticationService} from '../../../auth/services/authentication.service';
import {BaseUserInfo} from '../../../shared/classes/base-user-info';
import {INavbarMenu} from '../../../shared/models/interfaces/inavbar-menu.interface';


@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent extends BaseUserInfo implements OnInit{

  public statisticsData$;
  public chartData$;
  public canvas: any;
  public ctx;
  public chartColor;
  public chartHours;
  public labels: any = [];
  public data: any = [];
  public currentRoleTitles: any;

  private titlesRemainingRoles = { title1: 'agents', title2: 'calls', title3: 'average_call_duration', title4: 'number_of_calls_by_month' };
  // tslint:disable-next-line:max-line-length
  private titlesSuperAgent = { title1: 'users_registered', title2: 'companies_registered', title3: 'users_registered_in_this_year_by_months',
    title4: 'number_of_users_registered_by_months'};

  constructor(authService: AuthenticationService,
              private statisticsService: StatisticsService) {
    super(authService);
  }

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

    this.chartColor = '#FFFFFF';
    this.canvas = document.getElementById('chartHours');
    this.ctx = this.canvas.getContext('2d');

    this.chartData$.forEach(item => {
        item.forEach(data => {
           this.labels.push(data.month);
           this.data.push(data.number);
        });
    });

    this.buildChart(this.labels, this.data);
  }

  private buildChart(labels: any, data: any) {
    this.chartHours = new Chart(this.ctx, {
      type: 'line',

      data: {
        labels: this.labels,
        datasets: [{
          borderColor: '#6bd098',
          backgroundColor: '#EC7629',
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          data: this.data
        }
        ]
      },
      options: {
        legend: {
          display: false
        },

        tooltips: {
          enabled: false
        },

        scales: {
          yAxes: [{

            ticks: {
              fontColor: '#9f9f9f',
              beginAtZero: false,
              maxTicksLimit: 5,
              // padding: 20
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: '#ccc',
              color: 'rgba(255,255,255,0.05)'
            }

          }],

          xAxes: [{
            gridLines: {
              drawBorder: false,
              color: 'rgba(255,255,255,0.1)',
              zeroLineColor: 'transparent',
              display: false,
            },
            ticks: {
              padding: 20,
              fontColor: '#9f9f9f'
            }
          }]
        },
      }
    });

  }

}

