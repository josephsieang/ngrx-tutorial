import { createAction } from '@ngrx/store';

export const increment = createAction('[CounterState] increment');
export const decrement = createAction('[CounterState] decrement');
export const reset = createAction('[CounterState] reset');
