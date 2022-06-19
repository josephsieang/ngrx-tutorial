import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl } from 'src/app/store/router/custom-serializer';
import { getCurrentRoute } from 'src/app/store/router/router.selectors';
import { PostsState } from './posts.state';

export const POSTS_STATE_NAME = 'posts';

const getPostsState = createFeatureSelector<PostsState>(POSTS_STATE_NAME);

export const getPosts = createSelector(getPostsState, (state) => state.posts);
export const getPostById = createSelector(getPostsState, getCurrentRoute, (postsState: PostsState, route: RouterStateUrl) => {
  const postId = route.params['id'];
  const post = postsState.posts.find((post) => post.id === postId);

  return post;
});
