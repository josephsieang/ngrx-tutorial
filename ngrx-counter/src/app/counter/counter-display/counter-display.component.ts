import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-display',
  templateUrl: './counter-display.component.html',
  styleUrls: ['./counter-display.component.scss']
})
export class CounterDisplayComponent implements OnInit, OnDestroy {
  count: number = 0;

  private unsubscription: Subject<void> = new Subject<void>();

  constructor(private store: Store<{ counter: CounterState }>) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.unsubscription.next();
    this.unsubscription.complete();
  }

  getCounter(): Observable<number> {
    return this.store.select('counter').pipe(
      map((val) => val.counter),
      takeUntil(this.unsubscription)
    );
  }
}
