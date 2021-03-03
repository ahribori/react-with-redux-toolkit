import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchTodos, todoSelector, todoSlice } from './store/modules/todo';

function App() {
  const [selectedId, setSelectedId] = useState<string>('');
  const dispatch = useAppDispatch();
  const todos = useAppSelector(todoSelector.selectAll);
  const todoSelected = useAppSelector((state) =>
    todoSelector.selectById(state, selectedId)
  );

  const handleClick = useCallback((id: string) => {
    return (e: React.MouseEvent<HTMLLIElement>) => {
      setSelectedId(id);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <div className="App">
      <button
        onClick={() => {
          dispatch(todoSlice.actions.removeAll());
        }}
      >
        removeAll
      </button>
      <button
        onClick={() => {
          dispatch(todoSlice.actions.removeById(1));
        }}
      >
        removeById
      </button>
      <div>
        <h3>Selected:</h3>
        {todoSelected && <pre>{JSON.stringify(todoSelected, null, 2)}</pre>}
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} onClick={handleClick(todo.id)}>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
