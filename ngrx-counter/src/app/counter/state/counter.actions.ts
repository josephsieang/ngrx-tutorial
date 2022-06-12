import { createAction, props } from '@ngrx/store';

export const increment = createAction('[CounterState] increment');
export const decrement = createAction('[CounterState] decrement');
export const reset = createAction('[CounterState] reset');

export const customIncrement = createAction('[CounterState] custom increment', props<{ value: number }>());
