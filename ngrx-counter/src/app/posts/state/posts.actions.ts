import { createAction, props } from '@ngrx/store';
import { Post } from 'src/app/models/post';

export const ADD_POST_ACTION = '[PostsState] add post';
export const ADD_POST_SUCCESS_ACTION = '[PostsState] add post success';
export const UPDATE_POST_ACTION = '[PostsState] update post';
export const DELETE_POST_ACTION = '[PostsState] delete post';
export const LOAD_POST_ACTION = '[PostsState] load post';
export const LOAD_POST_SUCCESS = '[PostsState] load post success';
export const UPDATE_POST_SUCCESS = '[PostsState] update post success';
export const DELETE_POST_SUCCESS = '[PostsState] delete post success';

export const addPost = createAction(ADD_POST_ACTION, props<{ post: Post }>());
export const addPostSuccess = createAction(ADD_POST_SUCCESS_ACTION, props<{ post: Post }>());
export const updatePost = createAction(UPDATE_POST_ACTION, props<{ post: Post }>());
export const deletePost = createAction(DELETE_POST_ACTION, props<{ id: string }>());
export const loadPosts = createAction(LOAD_POST_ACTION);
export const loadPostsSuccess = createAction(LOAD_POST_SUCCESS, props<{ posts: Post[] }>());
export const updatePostSuccess = createAction(UPDATE_POST_SUCCESS, props<{ post: Post }>());
export const deletePostSuccess = createAction(DELETE_POST_SUCCESS, props<{ id: string }>());
