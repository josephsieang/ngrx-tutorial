import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post';
import { deletePost } from '../state/posts.actions';
import { getPosts } from '../state/posts.selectors';
import { PostsState } from '../state/posts.state';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts?: Observable<Post[]>;

  constructor(private store: Store<PostsState>) {}

  ngOnInit(): void {
    this.posts = this.getPosts();
  }

  getPosts(): Observable<Post[]> {
    return this.store.select(getPosts);
  }

  onDeletePost(id: string): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.store.dispatch(deletePost({ id }));
    }
  }
}
