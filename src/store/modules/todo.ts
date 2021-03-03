import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
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

export const todoSlice = createSlice({
  name: 'todo',
  initialState: todoAdapter.getInitialState(initialState),
  reducers: {},
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
