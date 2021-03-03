import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '../index';
import { ITodo } from '../../model/Todo';
import TodoAPI from '../../api/TodoAPI';

interface TodoState {
  loading: boolean;
}

const initialState: TodoState = {
  loading: false,
};

export const fetchTodos = createAsyncThunk<ITodo[]>(
  'todo/fetchTodos',
  async () => {
    const response = await TodoAPI.fetchTodos();
    return response.data;
  }
);

export const todoAdapter = createEntityAdapter<ITodo>({
  selectId: (todo) => todo.id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

export const todoSelector = todoAdapter.getSelectors(
  (state: RootState) => state.todo
);

export const todoSlice = createSlice({
  name: 'todo',
  initialState: todoAdapter.getInitialState(initialState),
  reducers: {
    removeById(state, action: PayloadAction<number>) {
      todoAdapter.removeOne(state, action.payload);
    },
    removeAll(state) {
      todoAdapter.removeAll(state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      todoAdapter.addMany(state, action);
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {});
  },
});
