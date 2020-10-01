import {Component, OnInit, Inject, Output, EventEmitter, Input, OnDestroy} from '@angular/core';
import { ConfirmationModel } from '../../models/confimation-popup.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {IDialogCloseData} from '../../models/interfaces/idialog-close-data.interface';
import {BaseSubscription} from '../../classes/base-subscription';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss']
})
export class ConfirmationPopupComponent extends BaseSubscription implements OnInit, OnDestroy {
  @Input() close$: Observable<IDialogCloseData>;

  @Output() saveChange: EventEmitter<void> = new EventEmitter<void>();

  @Output() closeChange: EventEmitter<void> = new EventEmitter<void>();

  @Input() closeOnSave = true;

  constructor(public dialogRef: MatDialogRef<ConfirmationPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ConfirmationModel) {
    super();
  }

  ngOnInit() {
    if (this.close$) {
      this.sink = this.close$.subscribe((data: IDialogCloseData) => {
        this.close(data.ok, data.data);
      });
    }
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  public onNoClick() {
    this.closeChange.emit();
    this.close(false);
  }

  public confirm() {
    this.saveChange.emit();
    if (this.closeOnSave) {
      this.close();
    }
  }

  private close = (ok: boolean = true, data: any = null) => {
    this.dialogRef.close({
      ok,
      data
    });
  }
}
