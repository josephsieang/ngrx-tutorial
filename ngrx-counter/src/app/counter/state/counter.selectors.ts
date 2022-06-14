import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from './counter.state';

export const COUNTER_STATE_NAME = 'counter';

const getCounterState = createFeatureSelector<CounterState>(COUNTER_STATE_NAME);

export const getCount = createSelector(getCounterState, (state) => state.counter);
export const getAuthor = createSelector(getCounterState, (state) => state.author);
