import { createAction, props } from '@ngrx/store';

export const SET_LOADING_ACTION = '[SharedState] set loading spinner';
export const SET_ERROR_MESSAGE_ACTION = '[SharedState] set error message';

export const setLoadingSpinner = createAction(SET_LOADING_ACTION, props<{ status: boolean }>());
export const setErrorMessage = createAction(SET_ERROR_MESSAGE_ACTION, props<{ message: string }>());
