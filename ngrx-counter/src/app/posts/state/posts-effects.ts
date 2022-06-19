import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RouterNavigationAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { filter, map, mergeMap, switchMap, tap } from 'rxjs';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';
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

@Injectable()
export class PostsEffects {
  constructor(private action$: Actions, private postsService: PostsService, private router: Router) {}

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
      switchMap((id: string) =>
        this.postsService.getPostById(id).pipe(
          map((post) => {
            const postWithId: Post = { ...post, id };
            return loadPostsSuccess({ posts: [postWithId] });
          })
        )
      )
    );
  });
}
