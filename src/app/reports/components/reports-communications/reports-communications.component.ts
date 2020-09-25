import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ReportsApiService} from '../../services/reports-api.service';
import {FormControl, FormGroup} from '@angular/forms';
import {formatDate} from '@angular/common';
import {Observable} from 'rxjs';
import {IReport} from '../../models/ireport.interface';


@Component({
  templateUrl: './reports-communications.component.html',
  styleUrls: ['./reports-communications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ReportsCommunicationsComponent implements OnInit {

  constructor(
    private reportsApiService: ReportsApiService) {}

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  avgData$: Observable<IReport[]>;
  data: IReport[] = [];

  report = false;
  titleTranslations: { [key: string]: any };

  private titleAvg = { title: 'avg_duration'};
  private titleCommCount = { title: 'comm_count'};


  ngOnInit() {
    this.getAvgData();
  }

  onClickAvgDuration() {
    this.getAvgData();
    this.report = true;
  }

  getAvgData() {
      this.titleTranslations = this.titleAvg;
      this.avgData$ = this.reportsApiService.getAverageDuration(
        formatDate(this.range.value.start, 'yyyy-MM-dd hh:mm:ss', 'en_US'),
        formatDate(this.range.value.end, 'yyyy-MM-dd hh:mm:ss', 'en_US'));
      this.avgData$.subscribe((items: IReport[]) => {
        items.forEach(item => {
          this.data.push(item);
        });
      });
  }

  onClickCommunicationCount() {
    this.getCommunicationData();
    this.report = true;
  }

  private getCommunicationData() {
    this.titleTranslations = this.titleCommCount;
    this.avgData$ = this.reportsApiService.getCommunicationCount(
      formatDate(this.range.value.start, 'yyyy-MM-dd hh:mm:ss', 'en_US'),
      formatDate(this.range.value.end, 'yyyy-MM-dd hh:mm:ss', 'en_US'));
    this.avgData$.subscribe((items: IReport[]) => {
      items.forEach(item => {
        this.data.push(item);
      });
    });
  }
}
