import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { Post } from 'src/app/models/post';
import { showFormFieldError } from 'src/app/utilities/form';
import { updatePost } from '../state/posts.actions';
import { getPostById } from '../state/posts.selectors';
import { PostsState } from '../state/posts.state';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit, OnDestroy {
  postForm!: FormGroup;
  postId: string | null = null;

  private unsubscription: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute, private store: Store<PostsState>, private router: Router) {}

  ngOnInit(): void {
    this.initPostForm();
    this.getPostId()
      .pipe(tap({ next: () => this.getPostById().subscribe() }))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscription.next();
    this.unsubscription.complete();
  }

  onUpdatePost(): void {
    if (!this.postForm.valid) {
      return;
    }

    const post: Post = this.postForm.getRawValue();
    this.store.dispatch(updatePost({ post }));
    this.router.navigate(['/posts']);
  }

  showFormFieldError(formControlName: string, error: string): boolean {
    return showFormFieldError(this.postForm, formControlName, error);
  }

  getPostId(): Observable<ParamMap> {
    return this.route.paramMap.pipe(
      tap({
        next: (params) => (this.postId = params.get('id'))
      })
    );
  }

  getPostById(): Observable<Post | undefined> {
    return this.store.select(getPostById(this.postId)).pipe(
      takeUntil(this.unsubscription),
      tap({
        next: (post) => {
          this.postForm.setValue({
            id: this.postId,
            title: post?.title || null,
            description: post?.description || null
          });
        }
      })
    );
  }

  private initPostForm(): void {
    this.postForm = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)])
    });
  }
}
