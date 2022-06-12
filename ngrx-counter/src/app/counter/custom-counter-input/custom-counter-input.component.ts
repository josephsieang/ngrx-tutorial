import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { customIncrement, modifyAuthor } from '../state/counter.actions';
import { getAuthor } from '../state/counter.selectors';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.scss']
})
export class CustomCounterInputComponent implements OnInit {
  inputVal?: number;
  author?: string;

  private unsubscription: Subject<void> = new Subject<void>();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // this.getCounterAuthor().subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscription.next();
    this.unsubscription.complete();
  }

  onAddToCounterClick(): void {
    if (this.inputVal !== undefined) {
      this.store.dispatch(customIncrement({ value: +this.inputVal }));
    }
  }

  onAuthorChangeBtnClick(): void {
    this.store.dispatch(modifyAuthor());
  }

  getCounterAuthor(): Observable<string> {
    // return this.store.select('counter').pipe(
    //   tap(() => {
    //     console.log('getCounterAuthor() called');
    //   }),
    //   map((counter) => counter.author),
    //   tap((author) => (this.author = author)),
    //   takeUntil(this.unsubscription)
    // );
    return this.store.select(getAuthor);
    // .pipe(
    //   takeUntil(this.unsubscription),
    //   tap(() => {
    //     console.log('getCounterAuthor() called');
    //   }),
    //   tap((author) => (this.author = author))
    // );
  }
}
