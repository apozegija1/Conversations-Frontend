import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessManagerService {
  isLoadingData$: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.isLoadingData$.next(false);
  }

  public run(observable: Observable<any>): void {
    this.isLoadingData$.next(true);
    observable.subscribe(() => this.isLoadingData$.next(false));
  }

  public isLoading$(): Observable<boolean> {
    return this.isLoadingData$.asObservable();
  }
}
