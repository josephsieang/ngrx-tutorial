import { sharedReducer } from './shared/shared.reducers';
import * as sharedSelectors from './shared/shared.selectors';
import * as authSelectors from '../auth/state/auth.selectors';
import { authReducer } from '../auth/state/auth.reducers';
import { routerReducer } from '@ngrx/router-store';

export const appReducer = {
  [sharedSelectors.SHARED_STATE_NAME]: sharedReducer,
  [authSelectors.AUTH_STATE_NAME]: authReducer,
  router: routerReducer
};
