export interface CounterState {
  counter: number;
  author: string;
}

export const initialState: CounterState = {
  counter: 0,
  author: 'Joseph Ng'
};
