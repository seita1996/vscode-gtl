import { initApi } from './initApi';
import { settings } from './settings';

export const fetchTodos = async (): Promise<any[]> => {
    const gitlabApi = await initApi(settings);
    return await gitlabApi.todos();
};
