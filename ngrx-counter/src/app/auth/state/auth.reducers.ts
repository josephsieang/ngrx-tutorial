import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout, signUpSuccess } from './auth.actions';
import { initialState } from './auth.state';

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user
    };
  }),
  on(signUpSuccess, (state, action) => {
    return {
      ...state,
      user: action.user
    };
  }),
  on(logout, (state) => {
    return {
      ...state,
      user: null
    };
  })
);
