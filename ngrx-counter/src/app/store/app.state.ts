import * as authSelectors from '../auth/state/auth.selectors';
import { AuthState } from '../auth/state/auth.state';
import * as sharedSelectors from './shared/shared.selectors';
import { SharedState } from './shared/shared.state';

export interface AppState {
  [sharedSelectors.SHARED_STATE_NAME]: SharedState;
  [authSelectors.AUTH_STATE_NAME]: AuthState;
}
