import {Component, Input, OnInit, ViewChild} from '@angular/core';

import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {CellType} from '../../models/enums/cell-type.enum';
import {ITableConfig} from '../../models/interfaces/itable-config.interface';

@Component({
    templateUrl: 'common-table.component.html',
    selector: 'app-common-table',
    styleUrls: ['./common-table.component.scss']
})

export class CommonTableComponent implements OnInit {

  @Input() header: string;

  @Input() tableConfig: ITableConfig = {
    columns: [{
      dataType: CellType.Text,
      id: 'position',
      title: 'Position'
    },
    {
      dataType: CellType.Text,
      id: 'name',
      title: 'Name'
    },
    {
      dataType: CellType.Text,
      id: 'weight',
      title: 'Weight'
    },
    {
      dataType: CellType.Link,
      id: 'link',
      title: 'Link'
    },
    {
      dataType: CellType.Text,
      id: 'symbol',
      title: 'Symbol'
    }, {
      dataType: CellType.ActionButtons,
      id: 'actions',
      title: 'Actions'
    }]
  };

  @Input() data: any[] = ELEMENT_DATA;

  public dataSource = new MatTableDataSource<any>(this.data);

  public visibleColumns: string[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.visibleColumns = this.tableConfig.columns.map((column) => column.id);
  }

  public delete() {

  }

  public edit() {

  }
}

const ELEMENT_DATA: any[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', link: 'https://google.com'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
