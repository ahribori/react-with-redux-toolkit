import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchTodos, todoAdapter } from './store/modules/todo';

function App() {
  const dispatch = useAppDispatch();
  const todoState = useAppSelector((state) => state.todo);
  const todoSelectors = todoAdapter.getSelectors();

  const todos = todoSelectors.selectAll(todoState);

  console.log(todoSelectors.selectById(todoState, '13'));

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <div className="App">
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
