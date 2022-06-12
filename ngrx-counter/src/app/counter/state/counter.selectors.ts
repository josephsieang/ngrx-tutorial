import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from './counter.state';

const getCounterState = createFeatureSelector<CounterState>('counter');
export const getCount = createSelector(getCounterState, (state) => state.counter);
export const getAuthor = createSelector(getCounterState, (state) => state.author);
