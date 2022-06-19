import { createReducer, on } from '@ngrx/store';
import { addPostSuccess, deletePost, deletePostSuccess, loadPostsSuccess, updatePost, updatePostSuccess } from './posts.actions';
import { initialState } from './posts.state';

export const postsReducer = createReducer(
  initialState,
  on(addPostSuccess, (state, action) => {
    const post = { ...action.post };

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
  on(deletePostSuccess, (state, { id }) => {
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
  }),
  on(updatePostSuccess, (state, action) => {
    const updatedPosts = state.posts.map((post) => (action.post.id === post.id ? action.post : post));

    return {
      ...state,
      posts: updatedPosts
    };
  })
);
