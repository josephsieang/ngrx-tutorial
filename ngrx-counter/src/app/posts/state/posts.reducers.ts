import { createReducer, on } from '@ngrx/store';
import { addPostSuccess, deletePost, deletePostSuccess, loadPostsSuccess, updatePost, updatePostSuccess } from './posts.actions';
import { initialState, postsAdapter } from './posts.state';

export const postsReducer = createReducer(
  initialState,
  on(addPostSuccess, (state, action) => postsAdapter.addOne(action.post, state)),
  on(deletePostSuccess, (state, { id }) => postsAdapter.removeOne(id, state)),
  on(loadPostsSuccess, (state, action) => postsAdapter.setAll(action.posts, state)),
  on(updatePostSuccess, (state, action) => postsAdapter.updateOne(action.post, state))
);
