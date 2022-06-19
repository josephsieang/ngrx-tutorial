import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { addPost, addPostSuccess, loadPosts, loadPostsSuccess, updatePost, updatePostSuccess } from './posts.actions';

@Injectable()
export class PostsEffects {
  constructor(private action$: Actions, private postsService: PostsService) {}

  loadPosts$ = createEffect(() => {
    return this.action$.pipe(
      ofType(loadPosts),
      mergeMap((_action) => {
        return this.postsService.getPosts().pipe(
          map((data) => {
            return loadPostsSuccess({ posts: data });
          })
        );
      })
    );
  });

  addPost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(addPost),
      mergeMap((action) => {
        return this.postsService.addPost(action.post).pipe(
          map((data) => {
            const post = { ...action.post, id: data.name };
            return addPostSuccess({ post });
          })
        );
      })
    );
  });

  editPost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(updatePost),
      switchMap((action) => {
        return this.postsService.editPost(action.post).pipe(
          map((data) => {
            return updatePostSuccess({ post: action.post });
          })
        );
      })
    );
  });
}
