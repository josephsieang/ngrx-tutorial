import { createReducer } from '@ngrx/store';
import { initialState } from './auth.state';

export const authReducer = createReducer(initialState);
