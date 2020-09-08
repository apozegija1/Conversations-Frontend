import {Component, OnInit} from '@angular/core';
import Chart from 'chart.js';
import {StatisticsService} from '../../../statistics/services/statistics.service';



@Component({
  // tslint:disable-next-line:component-selector
  selector: 'home-cmp',
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit{

  public statisticsData;
  public chartData;
  public canvas: any;
  public ctx;
  public chartColor;
  public chartHours;

  constructor(private statisticsService: StatisticsService) {}

  getStatisticsData() {
    this.statisticsService.getStats().subscribe(
      data => { this.statisticsData = data; },
      err => console.log(err),
      () => console.log('Data loaded')
    );
  }

  getChartData() {
    this.statisticsService.getStatsForChart().subscribe(
      data => { this.statisticsData = data; },
      err => console.log(err),
      () => console.log('Data loaded')
    );
  }


  ngOnInit(){
    this.getStatisticsData();
    this.getChartData();

    this.chartColor = '#FFFFFF';

    this.canvas = document.getElementById('chartHours');
    this.ctx = this.canvas.getContext('2d');

    this.chartHours = new Chart(this.ctx, {
      type: 'line',

      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [{
          borderColor: '#6bd098',
          backgroundColor: '#EC7629',
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          data: this.chartData
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
