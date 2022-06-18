import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { loadPosts, loadPostsSuccess } from './posts.actions';

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
}
