import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ITodo } from '../../model/Todo';
import TodoAPI from '../../api/TodoAPI';

interface TodoState {
  todo: ITodo | null;
}

const initialState: TodoState = {
  todo: null,
};

export const fetchTodo = createAsyncThunk<ITodo, string>(
  'todo/fetchTodo',
  async (todoId: string) => {
    const response = await TodoAPI.fetchTodo(todoId);
    return response.data;
  }
);

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    clear(state, { payload }) {
      state.todo = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodo.fulfilled, (state, action) => {
      state.todo = action.payload;
    });
  },
});
