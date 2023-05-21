// import { initApi } from './initApi';
import { initGraphqlApi } from './initGraphqlApi';
import { settings } from './settings';

export const fetchTodos = async (): Promise<any[]> => {
    // REST API
    // const gitlabApi = await initApi(settings);
    // return await gitlabApi.todos();

    // GraphQL API
    const gitlabGraphqlApi = await initGraphqlApi(settings);
    const res = await gitlabGraphqlApi.todos();
    return res.data.currentUser.todos.nodes;
};
