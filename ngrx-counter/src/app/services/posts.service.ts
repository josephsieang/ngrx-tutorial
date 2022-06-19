import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('https://ngrx-counter-d5f2c-default-rtdb.firebaseio.com/posts.json').pipe(
      map((data) => {
        const posts: Post[] = [];

        for (const key in data) {
          posts.push({ ...data[key], id: key });
        }

        return posts;
      })
    );
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`https://ngrx-counter-d5f2c-default-rtdb.firebaseio.com/posts/${id}.json`);
  }

  addPost(post: Post): Observable<{ name: string }> {
    return this.http.post<{ name: string }>('https://ngrx-counter-d5f2c-default-rtdb.firebaseio.com/posts.json', post);
  }

  editPost(post: Post) {
    const postData = {
      [post.id]: {
        title: post.title,
        description: post.description
      }
    };
    return this.http.patch('https://ngrx-counter-d5f2c-default-rtdb.firebaseio.com/posts.json', postData);
  }

  deletePost(id: string) {
    return this.http.delete(`https://ngrx-counter-d5f2c-default-rtdb.firebaseio.com/posts/${id}.json`);
  }
}
