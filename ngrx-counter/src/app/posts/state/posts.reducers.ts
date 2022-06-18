import { createReducer, on } from '@ngrx/store';
import { addPost, deletePost, loadPostsSuccess, updatePost } from './posts.actions';
import { initialState } from './posts.state';

export const postsReducer = createReducer(
  initialState,
  on(addPost, (state, action) => {
    const post = { ...action.post };
    post.id = String(state.posts.length + 1);

    return {
      ...state,
      posts: [...state.posts, post]
    };
  }),
  on(updatePost, (state, action) => {
    const updatedPosts = state.posts.map((post) => (action.post.id === post.id ? action.post : post));

    return {
      ...state,
      posts: updatedPosts
    };
  }),
  on(deletePost, (state, { id }) => {
    const updatedPosts = state.posts.filter((post) => post.id !== id);

    return {
      ...state,
      posts: updatedPosts
    };
  }),
  on(loadPostsSuccess, (state, action) => {
    return {
      ...state,
      posts: action.posts
    };
  })
);
