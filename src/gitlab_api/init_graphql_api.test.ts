import { GitlabSettings } from '../types';
import { GitLabUrlNotSet, GitLabTokenNotSet } from '../errors';
import fetch from 'cross-fetch';
import { GitlabGraphqlApi, initGraphqlApi } from './init_graphql_api';

jest.mock('cross-fetch');

describe('GitlabGraphqlApi', () => {
  let api: GitlabGraphqlApi;
  const settings: GitlabSettings = {
    host: 'https://gitlab.com',
    token: 'my-token',
  };

  beforeEach(() => {
    api = new GitlabGraphqlApi(settings);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should set the correct URL', () => {
    expect(api.url).toBe('https://gitlab.com/api/graphql');
  });

  it('should set the correct headers', () => {
    expect(api.headers['Authorization']).toBe('Bearer my-token');
    expect(api.headers['Content-Type']).toBe('application/json');
  });

  it('should set the correct request timeout', () => {
    expect(api.requestTimeout).toBe(10000);
  });

  it('should fetch todos', async () => {
    const data = { todos: { nodes: [] } };
    const res = { json: jest.fn().mockResolvedValue(data) };
    (fetch as jest.Mock).mockResolvedValue(res);

    const result = await api.todos();

    expect(fetch).toHaveBeenCalledWith(api.url, expect.any(Object));
    expect(res.json).toHaveBeenCalled();
    expect(result).toEqual(data);
  });
});

describe('initGraphqlApi', () => {
  const settings: GitlabSettings = {
    host: 'https://gitlab.com',
    token: 'my-token',
  };

  it('should create a new GitlabGraphqlApi instance', () => {
    const result = initGraphqlApi(settings);
    expect(result).toBeInstanceOf(GitlabGraphqlApi);
  });

  it('should throw an error if token is missing', () => {
    const invalidSettings = { ...settings, token: '' };
    expect(() => initGraphqlApi(invalidSettings)).toThrow(GitLabTokenNotSet);
  });

  it('should throw an error if host is missing', () => {
    const invalidSettings = { ...settings, host: '' };
    expect(() => initGraphqlApi(invalidSettings)).toThrow(GitLabUrlNotSet);
  });
});
