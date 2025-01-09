import { Dispatch, useReducer } from 'react';

export function useMinimizedState<T extends object>(
  initialState: T
): [T, Dispatch<Partial<T>>] {
  return useReducer(
    (state: T, newState: Partial<T>) => ({ ...state, ...newState }),
    initialState
  );
}
