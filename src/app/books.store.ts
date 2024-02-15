import { signalStore, withState, patchState, withComputed, withMethods } from '@ngrx/signals';
import { computed } from '@angular/core';
import { immutablePatchState } from 'sygnalyze/ngrx'

interface Book {
    id: number;
    title: string;
    author: string;
}

type BooksState = {
  books: Book[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: BooksState = {
  books: [
    { id: 1, title: 'Lord of the Rings', author: 'J.R.R. Tolkien' },
    { id: 2, title: 'The Hobbit', author: 'J.R.R. Tolkien' },
    { id: 3, title: 'Harry Potter', author: 'J.K. Rowling' },
    { id: 4, title: 'The Da Vinci Code', author: 'Dan Brown' },
    { id: 5, title: 'Angels & Demons', author: 'Dan Brown' }, 
    { id: 6, title: 'The Lost Symbol', author: 'Dan Brown' },
  ],
  isLoading: false,
  filter: { query: '', order: 'asc' },
};

export const BooksStore = signalStore(
  withState(initialState),
  withComputed(({ books, filter }) => ({
    booksCount: computed(() => books().length),
    sortedBooks: computed(() => {
      const direction = filter.order() === 'asc' ? 1 : -1;

      return books().toSorted((a, b) =>
        direction * a.title.localeCompare(b.title)
      );
    }), 
  })),
  withMethods((store) => ({
    updateQuery(query: string): void {
      patchState(store, (state) => ({ filter: { ...state.filter, query } }));
    },

    updateOrderMutative(order: 'asc' | 'desc'): void {
      immutablePatchState(store, (state) => { state.filter.order = order });
    },
    updateOrder(order: 'asc' | 'desc'): void {
      patchState(store, (state) => ({ filter: { ...state.filter, order } }));
    },
    updateOrderWRONG(order: 'asc' | 'desc'): void {
      patchState(store, (state) => {
        state.filter.order = order
        return state
      });
    },

  }))
);
