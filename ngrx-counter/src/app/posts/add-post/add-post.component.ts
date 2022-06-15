import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/post';
import { showFormFieldError } from 'src/app/utilities/form';
import { addPost } from '../state/posts.actions';
import { PostsState } from '../state/posts.state';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  postForm!: FormGroup;

  constructor(private store: Store<PostsState>) {}

  ngOnInit(): void {
    this.initPostForm();
  }

  onAddPost(): void {
    if (!this.postForm.valid) {
      return;
    }

    const post: Post = this.postForm.getRawValue();
    this.store.dispatch(addPost({ post }));
  }

  showFormFieldError(formControlName: string, error: string): boolean {
    return showFormFieldError(this.postForm, formControlName, error);
  }

  private initPostForm(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)])
    });
  }
}
