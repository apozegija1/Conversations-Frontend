import { Directive, OnInit, OnDestroy, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {BaseSubscription} from '../classes/base-subscription';

@Directive({
  selector: '[appDebounceClick]'
})
export class DebounceClickDirective extends BaseSubscription implements OnInit, OnDestroy {
  @Input() debounceTime = 500;
  @Output() debounceClick = new EventEmitter();

  private clicks = new Subject();

  constructor() {
    super();
  }

  ngOnInit() {
    this.sink = this.clicks
      .pipe(debounceTime(this.debounceTime))
      .subscribe(e => this.debounceClick.emit(e));
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  @HostListener('click', ['$event'])
  clickEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }
}


