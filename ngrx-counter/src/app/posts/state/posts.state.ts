import { Post } from 'src/app/models/post';

export interface PostsState {
  posts: Post[];
}

export const initialState: PostsState = {
  posts: [
    {
      id: '1',
      title: 'Hello World',
      description: 'Welcome to Ngrx'
    },
    {
      id: '2',
      title: 'Pro',
      description: 'You are a pro'
    }
  ]
};
