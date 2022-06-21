import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Post } from 'src/app/models/post';

export interface PostsState extends EntityState<Post> {
  count: number;
}

export const postsAdapter = createEntityAdapter<Post>({
  // By default, ngrx will take id as primary key
  // selectId: (post: Post) => post.id

  sortComparer: sortByName
});

export const initialState: PostsState = postsAdapter.getInitialState({
  posts: [],
  count: 0
});

export function sortByName(a: Post, b: Post): number {
  return a.title.localeCompare(b.title);
}
