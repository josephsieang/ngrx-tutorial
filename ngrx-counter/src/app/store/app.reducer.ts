import { sharedReducer } from './shared/shared.reducers';
import * as sharedSelectors from './shared/shared.selectors';

export const appReducer = {
  [sharedSelectors.SHARED_STATE_NAME]: sharedReducer
};
