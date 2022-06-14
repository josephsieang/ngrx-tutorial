import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostListComponent } from './post-list/post-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { POSTS_STATE_NAME } from './state/posts.selectors';
import { counterReducer } from '../counter/state/counter.reducers';

const routes: Routes = [
  {
    path: '',
    component: PostListComponent,
    children: [
      {
        path: 'edit/:id',
        component: EditPostComponent
      },
      {
        path: 'add',
        component: AddPostComponent
      }
    ]
  }
];

@NgModule({
  declarations: [PostListComponent, AddPostComponent, EditPostComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, StoreModule.forFeature(POSTS_STATE_NAME, counterReducer)]
})
export class PostsModule {}
