import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoadingData$: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.isLoadingData$.next(false);
  }

  public startLoading(): void {
    this.isLoadingData$.next(true);
  }

  public stopLoading(): void {
    this.isLoadingData$.next(false);
  }

  public isLoading$() {
    return this.isLoadingData$.asObservable();
  }
}
