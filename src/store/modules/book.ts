import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

type Book = { bookId: string; title: string };

export const booksAdapter = createEntityAdapter<Book>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: (book) => book.bookId,
  // Keep the "all IDs" array sorted based on book titles
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

export const booksSlice = createSlice({
  name: 'books',
  initialState: booksAdapter.getInitialState({
    loading: 'idle',
  }),
  reducers: {
    // Can pass adapter functions directly as case reducers.  Because we're passing this
    // as a value, `createSlice` will auto-generate the `bookAdded` action type / creator
    bookAdded: booksAdapter.addOne,
    booksLoading(state, action) {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    },
    booksReceived(state, action) {
      // Or, call them as "mutating" helpers in a case reducer
      booksAdapter.setAll(state, action.payload.books);
    },
    bookUpdated: booksAdapter.updateOne,
  },
});
