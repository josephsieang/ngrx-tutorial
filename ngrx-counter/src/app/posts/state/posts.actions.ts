import { createAction, props } from '@ngrx/store';
import { Post } from 'src/app/models/post';

export const ADD_POST_ACTION = '[PostsState] add post';

export const addPost = createAction(ADD_POST_ACTION, props<{ post: Post }>());
