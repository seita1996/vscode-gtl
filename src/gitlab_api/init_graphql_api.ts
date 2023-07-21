import { GitlabSettings } from '../types';
import { FailFetchSettings, GitLabUrlNotSet, GitLabTokenNotSet } from '../errors';
import fetch from 'cross-fetch';

export class GitlabGraphqlApi {
  public readonly url: string;
  public readonly headers: { [header: string]: string };
  public readonly requestTimeout: number;
  constructor({
    host = 'https://gitlab.com',
    token = '',
    requestTimeout = 10000
  }) {
    this.url = [host, 'api', 'graphql'].join('/');
    this.headers = {};
    this.headers['Authorization'] = `Bearer ${token}`;
    this.headers['Content-Type'] = 'application/json';
    this.requestTimeout = requestTimeout;
  }

  public async todos() {
    const res: any = await fetch(this.url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        query: `
                query todos {
                  currentUser {
                    todos {
                      nodes {
                        id
                        targetType
                        createdAt
                        action
                        author {
                          name
                          avatarUrl
                        }
                        project {
                          name
                        }
                        target {
                          webUrl
                          ... on Issue {
                            title
                            IssueState: state
                          }
                          ... on MergeRequest {
                            title
                            MergeRequestState: state
                          }
                        }
                        note {
                          id
                          body
                          resolved
                          discussion {
                            notes {
                              nodes {
                                body
                                resolved
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
                `
      })
    });
    return await res.json();
  }

  public async todoMarkAsDone(gid: string) {
    const res: any = await fetch(this.url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        query: `
                mutation todo {
                  todoMarkDone(input: {
                    id: "${gid}"
                  }) {
                    errors
                    todo {
                      state
                    }
                  }
                }
                `
      })
    });
    return await res.json();
  }

  public async todoMarkAllAsDone() {
    const res: any = await fetch(this.url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        query: `
                mutation todo {
                  todosMarkAllDone(input: {
                    clientMutationId: "todosMarkAllDoneMutation"
                  }) {
                    clientMutationId
                  }
                }
                `
      })
    });
    return await res.json();
  }
}

export const initGraphqlApi = (settings: GitlabSettings): any => {
  if (!settings) {
    throw new FailFetchSettings();
  }

  if (!settings.token) {
    throw new GitLabTokenNotSet();
  }

  if (!settings.host) {
    throw new GitLabUrlNotSet();
  }

  return new GitlabGraphqlApi({
    host: settings.host,
    token: settings.token
  });
};
