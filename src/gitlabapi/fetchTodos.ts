import { initGraphqlApi } from './initGraphqlApi';
import { settings } from './settings';

export const fetchTodos = async (): Promise<any[]> => {
    const gitlabGraphqlApi = await initGraphqlApi(settings);
    const res = await gitlabGraphqlApi.todos();
    return res.data.currentUser.todos.nodes;
};
