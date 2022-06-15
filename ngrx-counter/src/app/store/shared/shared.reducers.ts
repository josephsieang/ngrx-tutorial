import { createReducer, on } from '@ngrx/store';
import { setLoadingSpinner } from './shared.actions';
import { initialState } from './shared.state';

export const sharedReducer = createReducer(
  initialState,
  on(setLoadingSpinner, (state, action) => ({
    ...state,
    showLoading: action.status
  }))
);
