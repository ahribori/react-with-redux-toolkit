import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { booksAdapter, booksSlice } from './store/modules/book';

function App() {
  const dispatch = useAppDispatch();
  const bookSelectors = booksAdapter.getSelectors();

  const books = useAppSelector((state) => state.book);
  console.log(bookSelectors.selectById(books, '1'));

  useEffect(() => {
    dispatch(booksSlice.actions.bookAdded({ bookId: '1', title: '내 책 ' }));
  }, []);

  return <div className="App">App</div>;
}

export default App;
