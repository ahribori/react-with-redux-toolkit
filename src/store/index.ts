import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { todoSlice } from './modules/todo';
import { booksSlice } from './modules/book';

const rootReducer = combineReducers({
  todo: todoSlice.reducer,
  book: booksSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof rootReducer>;

export default store;
