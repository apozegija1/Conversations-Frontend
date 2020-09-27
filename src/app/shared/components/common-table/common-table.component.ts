import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {ITableConfig} from '../../models/interfaces/itable-config.interface';
import {ITableColumn} from '../../models/interfaces/itable-column.interface';
import {DialogPopupService} from '../../services/dialog-popup.service';
import {ConfirmationPopupComponent} from '../confirmation-popup/confirmation-popup.component';
import {TranslateService} from '@ngx-translate/core';
import {IPopupData} from '../../models/interfaces/ipopup-data.interface';

@Component({
    templateUrl: 'common-table.component.html',
    selector: 'app-common-table',
    styleUrls: ['./common-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonTableComponent implements OnInit {
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

  @Input() query: () => void;

  @Output() deleteChange: EventEmitter<any> = new EventEmitter<any>();

  @Output() editChange: EventEmitter<any> = new EventEmitter<any>();

  @Output() createChange: EventEmitter<void> = new EventEmitter<void>();

  @Output() viewChange: EventEmitter<any> = new EventEmitter<any>();

  private localData: Array<any>;

  public dataSource: MatTableDataSource<any>;

  public visibleColumns: string[];
  public tableColumns: ITableColumn[] = [];

  public isCreateChangeUsed = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private propDialogService: DialogPopupService,
              private translate: TranslateService) {}


  ngOnInit() {
    this.isCreateChangeUsed = this.createChange.observers.length > 0;
    this.initDataSource();
    if (this.tableConfig == null) {
      throw new Error('Please provide configuration for table so it can render data');
    }

    this.visibleColumns = this.tableConfig.columns.map((column: ITableColumn) => column.id);
    this.tableColumns = this.tableConfig.columns;
  }

  public delete(element: any) {
    const popupData: IPopupData = {
      title: this.translate.instant('delete_confirmation_title'),
      content: this.translate.instant('delete_confirmation_content')
    };

    this.propDialogService.processPopup(ConfirmationPopupComponent, popupData)
      .subscribe((ok: boolean) => {
        if (!ok) { return; }
        this.deleteChange.emit(element);
      });
  }

  public view(element: any) {
    this.viewChange.emit(element);
  }

  public edit(element: any) {
    this.editChange.emit(element);
  }

  public create() {
    this.createChange.emit();
  }

  private initDataSource() {
    this.dataSource = new MatTableDataSource<any>(this.data);
    this.dataSource.paginator = this.paginator;
  }
}
