import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { getCount } from '../state/counter.selectors';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-display',
  templateUrl: './counter-display.component.html',
  styleUrls: ['./counter-display.component.scss']
})
export class CounterDisplayComponent implements OnInit, OnDestroy {
  // count: number = 0;
  count?: Observable<number>;

  private unsubscription: Subject<void> = new Subject<void>();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // this.getCounter().subscribe();
    this.count = this.getCounter();
  }

  ngOnDestroy(): void {
    this.unsubscription.next();
    this.unsubscription.complete();
  }

  getCounter(): Observable<number> {
    // return this.store.select('counter').pipe(
    //   tap(() => {
    //     console.log('getCounterValue() called');
    //   }),
    //   map((counter) => counter.counter),
    //   tap((count) => (this.count = count)),
    //   takeUntil(this.unsubscription)
    // );
    return this.store.select(getCount);
    // .pipe(
    //   takeUntil(this.unsubscription),
    //   tap(() => {
    //     console.log('getCounterValue() called');
    //   }),
    //   tap((count) => (this.count = count))
    // );
  }
}
