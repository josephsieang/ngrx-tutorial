import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl } from 'src/app/store/router/custom-serializer';
import { getCurrentRoute } from 'src/app/store/router/router.selectors';
import { postsAdapter, PostsState } from './posts.state';

export const postsSelectors = postsAdapter.getSelectors();

export const POSTS_STATE_NAME = 'posts';

const getPostsState = createFeatureSelector<PostsState>(POSTS_STATE_NAME);

export const getPosts = createSelector(getPostsState, postsSelectors.selectAll);
export const getPostsEntities = createSelector(getPostsState, postsSelectors.selectEntities);
export const getPostById = createSelector(getPostsEntities, getCurrentRoute, (posts, route: RouterStateUrl) =>
  posts ? posts[route.params['id']] : undefined
);
