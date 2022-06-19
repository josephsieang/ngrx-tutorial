import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post';
import { AppState } from 'src/app/store/app.state';
import { getPostById } from '../state/posts.selectors';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post$?: Observable<Post | undefined>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.getPostById();
  }

  getPostById(): void {
    this.post$ = this.store.select(getPostById);
  }
}
