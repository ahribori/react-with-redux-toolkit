import axios from 'axios';
import { ITodo } from '../model/Todo';

class TodoAPI {
  fetchTodo(id: string) {
    return axios.get<ITodo>(`https://jsonplaceholder.typicode.com/todos/${id}`);
  }
}

export default new TodoAPI();
