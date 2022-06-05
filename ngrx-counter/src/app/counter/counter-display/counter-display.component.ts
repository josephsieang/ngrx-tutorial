import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Counter } from '../state/counter.state';

@Component({
  selector: 'app-counter-display',
  templateUrl: './counter-display.component.html',
  styleUrls: ['./counter-display.component.scss']
})
export class CounterDisplayComponent implements OnInit {
  count: number = 0;

  constructor(private store: Store<{ counter: Counter }>) {}

  ngOnInit(): void {
    this.store.select('counter').subscribe({ next: (val) => (this.count = val.counter) });
  }
}
