import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { RouterNavigationAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { filter, map, mergeMap, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';
import { AppState } from 'src/app/store/app.state';
import { RouterStateUrl } from 'src/app/store/router/custom-serializer';
import {
  addPost,
  addPostSuccess,
  deletePost,
  deletePostSuccess,
  loadPosts,
  loadPostsSuccess,
  updatePost,
  updatePostSuccess
} from './posts.actions';
import { getPosts } from './posts.selectors';

@Injectable()
export class PostsEffects {
  constructor(private action$: Actions, private postsService: PostsService, private router: Router, private store: Store<AppState>) {}

  loadPosts$ = createEffect(() => {
    return this.action$.pipe(
      ofType(loadPosts),
      withLatestFrom(this.store.select(getPosts)),
      mergeMap(([action, posts]) => {
        if (posts?.length === 0 || posts?.length === 1) {
          return this.postsService.getPosts().pipe(
            map((data) => {
              return loadPostsSuccess({ posts: data });
            })
          );
        } else {
          return of();
        }
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
            const updatedPost: Update<Post> = {
              id: action.post.id,
              changes: {
                ...action.post
              }
            };
            return updatePostSuccess({ post: updatedPost });
          })
        );
      })
    );
  });

  editPostSuccess$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(updatePostSuccess),
        tap(() => {
          this.router.navigate(['/posts']);
        })
      );
    },
    { dispatch: false }
  );

  deletePost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(deletePost),
      switchMap((action) => {
        return this.postsService.deletePost(action.id).pipe(
          map((data) => {
            return deletePostSuccess({ id: action.id });
          })
        );
      })
    );
  });

  getSinglePost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((action: RouterNavigationAction<RouterStateUrl>) => {
        return action.payload.routerState.url.startsWith('/posts/detail');
      }),
      map((action) => {
        return action.payload.routerState.params['id'];
      }),
      withLatestFrom(this.store.select(getPosts)),
      switchMap(([id, posts]: [string, Post[]]) => {
        if (posts?.length > 0) {
          return of();
        } else {
          return this.postsService.getPostById(id).pipe(
            map((post) => {
              const postWithId: Post = { ...post, id };
              return loadPostsSuccess({ posts: [postWithId] });
            })
          );
        }
      })
    );
  });
}
