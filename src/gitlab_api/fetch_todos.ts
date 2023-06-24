import { initGraphqlApi } from './init_graphql_api';
import { GitlabTodo } from '../types';
import { settings } from '../settings';

export const fetchTodos = async (): Promise<GitlabTodo[]> => {
  const gitlabGraphqlApi = await initGraphqlApi(settings);
  const res = await gitlabGraphqlApi.todos();
  return res.data.currentUser.todos.nodes;
};

export const incrementedTodos = (beforeTodos: GitlabTodo[], todos: GitlabTodo[]): GitlabTodo[] => {
  const incrementedTodos: GitlabTodo[] = [];
  todos.forEach((todo: GitlabTodo) => {
    if (!beforeTodos.some((beforeTodo: GitlabTodo) => beforeTodo.id === todo.id)) {
      incrementedTodos.push(todo);
    }
  });
  return incrementedTodos;
};
