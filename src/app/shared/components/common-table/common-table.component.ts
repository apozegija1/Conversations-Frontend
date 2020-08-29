import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {ITableConfig} from '../../models/interfaces/itable-config.interface';
import {ITableColumn} from '../../models/interfaces/itable-column.interface';

@Component({
    templateUrl: 'common-table.component.html',
    selector: 'app-common-table',
    styleUrls: ['./common-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonTableComponent implements OnInit, OnChanges {
  @Input() header: string;

  @Input() tableConfig: ITableConfig;

  @Input()
  public set data(newVal: any[]) {
    if (newVal != null && this.localData !== newVal) {
      this.localData = newVal;
      this.initDataSource();
    }
  }
  public get data() { return this.localData; }

  @Output() deleteChange: EventEmitter<any> = new EventEmitter<any>();

  @Output() editChange: EventEmitter<any> = new EventEmitter<any>();

  private localData: Array<any>;

  public dataSource: MatTableDataSource<any>;

  public visibleColumns: string[];
  public tableColumns: ITableColumn[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.initDataSource();
    if (this.tableConfig == null) {
      throw new Error('Please provide configuration for table so it can render data');
    }

    this.visibleColumns = this.tableConfig.columns.map((column) => column.id);
    this.tableColumns = this.tableConfig.columns;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  public delete(element: any) {
    this.deleteChange.emit(element);
  }

  public edit(element: any) {
    this.editChange.emit(element);
  }

  private initDataSource() {
    this.dataSource = new MatTableDataSource<any>(this.data);
    this.dataSource.paginator = this.paginator;
  }
}
