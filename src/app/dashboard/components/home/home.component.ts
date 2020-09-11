import {Component, OnInit} from '@angular/core';
import Chart from 'chart.js';
import {StatisticsService} from '../../../statistics/services/statistics.service';
import {map} from 'rxjs/operators';
import {ApiService} from '../../../core/services/api.service';
import {IUser} from '../../../users/models/iuser.interface';
import {Role} from '../../../users/models/role.enum';
import {IRole} from '../../../users/models/irole.interface';
import {forEach} from '@angular-devkit/schematics';
import {AuthenticationService} from '../../../auth/services/authentication.service';
import {BaseUserInfo} from '../../../shared/classes/base-user-info';
import {BehaviorSubject} from 'rxjs';
import {Constants} from '../../../shared/models/constants';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'home-cmp',
  templateUrl: 'home.component.html'
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

  public roleName: string;
  public title1: string;
  public title2: string;
  public title3: string;
  public titleChart: string;

  public isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);


  constructor(authService: AuthenticationService,
              private statisticsService: StatisticsService) {
    super(authService);
  }

  ngOnInit(){

    this.setCurrentUser();

    const matchingRoles = this.authService.getCurrentUser().roles.filter((userRole: IRole) => {
      return userRole.name;
    }, this);
    this.roleName = matchingRoles[0].name;
    if (this.roleName === Role.CompanyAdmin) {
      this.title1 = 'Agents';
      this.title2 = 'Calls';
      this.title3 = 'Average call duration';
      this.titleChart = 'Number of calls by month';
    } else if (this.roleName === Role.Admin) {
      this.title1 = 'Users registered';
      this.title2 = 'Companies registered';
      this.title3 = 'Users registered in this year by months';
      this.titleChart = 'Number of users registered by months';
    } else if (this.roleName === Role.Agent) {
      this.title1 = 'Agents';
      this.title2 = 'Calls';
      this.title3 = 'Average call duration';
      this.titleChart = 'Number of calls by month';
    } else {
      this.title1 = 'Agents';
      this.title2 = 'Calls';
      this.title3 = 'Average call duration';
      this.titleChart = 'Number of calls by month';
    }


    this.statisticsData$ = this.statisticsService.getStats()
      .pipe(map(ApiService.getResponseData));


    this.chartData$ = this.statisticsService.getStatsForChart()
      .pipe(map(ApiService.getResponseData));


    this.chartColor = '#FFFFFF';

    this.canvas = document.getElementById('chartHours');
    this.ctx = this.canvas.getContext('2d');
    this.chartData$.forEach(item => {
        item.forEach(data => {
           this.labels.push(data.month);
           this.data.push(data.number);
        });
    });


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

