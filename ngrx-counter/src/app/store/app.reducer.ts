import { counterReducer } from '../counter/state/counter.reducers';
import { postsReducer } from '../posts/state/posts.reducers';

export const appReducer = {
  counter: counterReducer,
  posts: postsReducer
};
