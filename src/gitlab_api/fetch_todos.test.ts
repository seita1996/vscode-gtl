import { fetchTodos, incrementedTodos } from './fetch_todos';
import { GitlabTodo } from '../types';

var todoList: GitlabTodo[] = [
  {
    id: 'gid://gitlab/Todo/1',
    targetType: 'MERGEREQUEST',
    createdAt: '2023-01-01T01:23:34Z',
    action: 'directly_addressed',
    author: {
        name: 'Dog',
        avatarUrl: '/uploads/-/system/user/avatar/12345678/avatar.png'
    },
    project: {
        name: 'awesome-project-A'
    },
    target: {
        webUrl: 'https://gitlab.com/seita1996/awesome-project-A/-/merge_requests/1',
        title: 'Fix bug',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        MergeRequestState: 'closed',
    },
    note: null
  },
  {
    id: 'gid://gitlab/Todo/2',
    targetType: 'MERGEREQUEST',
    createdAt: '2023-01-01T01:23:34Z',
    action: 'assigned',
    author: {
        name: 'Cat',
        avatarUrl: '/uploads/-/system/user/avatar/12345678/avatar.png'
    },
    project: {
        name: 'awesome-project-A'
    },
    target: {
        webUrl: 'https://gitlab.com/seita1996/awesome-project-A/-/merge_requests/2',
        title: 'Fix bug',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        MergeRequestState: 'opened'
    },
    note: null
  },
  {
    id: 'gid://gitlab/Todo/3',
    targetType: 'ISSUE',
    createdAt: '2023-01-01T01:23:34Z',
    action: 'directly_addressed',
    author: {
        name: 'Fox',
        avatarUrl: '/uploads/-/system/user/avatar/12345678/avatar.png'
    },
    project: {
        name: 'awesome-project-A'
    },
    target: {
        webUrl: 'https://gitlab.com/seita1996/awesome-project-A/-/issues/1',
        title: 'Fix bug',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        IssueState: 'opened'
    },
    note: null
  },
];

// Mock the settings
jest.mock('../settings', () => ({
  settings: {
    host: 'https://gitlab.com',
    token: '1234567890abcdefg',
  },
}));

// Mock the initGraphqlApi constructor and todos method
jest.mock('./init_graphql_api', () => ({
  initGraphqlApi: jest.fn().mockImplementation((settings) => {
    return {
      todos: jest.fn().mockResolvedValue({
        data: {
          currentUser: {
            todos: {
              nodes: todoList,
            },
          },
        },
      }),
    };
  }),
}));

describe('fetchTodos', () => {
  it('should fetch todos from GitLab GraphQL API', async () => {
    const todos = await fetchTodos();
    expect(todos).toEqual(todoList);
  });
});

describe('incrementedTodos', () => {
  const beforeTodos: GitlabTodo[] = todoList;

  const todos: GitlabTodo[] = todoList;

  it('should return an empty array if there are no new todos', () => {
    const newTodos = incrementedTodos(beforeTodos, todos);
    expect(newTodos).toEqual([]);
  });

  it('should return an array of new todos', () => {
    const newTodo = {
      id: 'gid://gitlab/Todo/4',
      targetType: 'ISSUE',
      createdAt: '2023-01-01T01:23:34Z',
      action: 'directly_addressed',
      author: {
          name: 'Gollira',
          avatarUrl: '/uploads/-/system/user/avatar/12345678/avatar.png'
      },
      project: {
          name: 'awesome-project-A'
      },
      target: {
          webUrl: 'https://gitlab.com/seita1996/awesome-project-A/-/issues/1',
          title: 'Fix bug',
          // eslint-disable-next-line @typescript-eslint/naming-convention
          IssueState: 'opened'
      },
      note: null
    };
    const newTodos = incrementedTodos(beforeTodos, [
      ...todos,
      newTodo,
    ]);
    expect(newTodos).toEqual([newTodo]);
  });
});
