import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { getCount } from '../state/counter.selectors';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-display',
  templateUrl: './counter-display.component.html',
  styleUrls: ['./counter-display.component.scss']
})
export class CounterDisplayComponent implements OnInit, OnDestroy {
  count?: Observable<number>;

  private unsubscription: Subject<void> = new Subject<void>();

  constructor(private store: Store<CounterState>) {}

  ngOnInit(): void {
    this.count = this.getCounter();
  }

  ngOnDestroy(): void {
    this.unsubscription.next();
    this.unsubscription.complete();
  }

  getCounter(): Observable<number> {
    return this.store.select(getCount);
  }
}
