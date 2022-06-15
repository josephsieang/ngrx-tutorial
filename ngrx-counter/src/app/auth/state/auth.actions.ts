import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user';

export const LOGIN_START = '[AuthState] login start';
export const LOGIN_SUCCESS = '[AuthState] login success';
export const LOGIN_FAILED = '[AuthState] login failed';

export const loginStart = createAction(LOGIN_START, props<{ email: string; password: string }>());
export const loginSuccess = createAction(LOGIN_SUCCESS, props<{ user: User }>());
