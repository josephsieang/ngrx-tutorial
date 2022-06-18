import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user';

export const LOGIN_START = '[AuthState] login start';
export const LOGIN_SUCCESS = '[AuthState] login success';
export const LOGIN_FAILED = '[AuthState] login failed';

export const SIGNUP_START = '[AuthState] sign up start';
export const SIGNUP_SUCCESS = '[AuthState] sign up success';

export const AUTO_LOGIN = '[AuthState] auto login';

export const LOGOUT = '[AuthState] log out';

export const loginStart = createAction(LOGIN_START, props<{ email: string; password: string }>());
export const loginSuccess = createAction(LOGIN_SUCCESS, props<{ user: User; redirect: boolean }>());

export const signUpStart = createAction(SIGNUP_START, props<{ email: string; password: string }>());
export const signUpSuccess = createAction(SIGNUP_SUCCESS, props<{ user: User; redirect: boolean }>());

export const autoLogin = createAction(AUTO_LOGIN);

export const logout = createAction(LOGOUT);
