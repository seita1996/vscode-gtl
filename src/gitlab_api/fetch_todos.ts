import { initGraphqlApi } from './init_graphql_api';
import { GitlabTodo } from '../types';
import { settings } from '../settings';

export const fetchTodos = async (): Promise<GitlabTodo[]> => {
  const gitlabGraphqlApi = await initGraphqlApi(settings);
  const res = await gitlabGraphqlApi.todos();
  return res.data.currentUser.todos.nodes;
};
