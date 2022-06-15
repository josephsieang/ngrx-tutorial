import * as sharedSelectors from './shared/shared.selectors';
import { SharedState } from './shared/shared.state';

export interface AppState {
  [sharedSelectors.SHARED_STATE_NAME]: SharedState;
}
