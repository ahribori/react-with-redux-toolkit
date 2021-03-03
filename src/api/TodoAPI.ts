import axios from 'axios';
import { ITodo } from '../model/Todo';

class TodoAPI {
  fetchTodos() {
    return axios.get<ITodo[]>(`https://jsonplaceholder.typicode.com/todos`);
  }
}

export default new TodoAPI();
