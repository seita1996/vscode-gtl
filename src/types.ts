export interface GitlabSettings {
  host: string;
  token: string;
}

export interface GitlabTodo {
  id: string;
  targetType: string;
  createdAt: string;
  action: string;
  author: {
      name: string;
      avatarUrl: string;
  };
  project: {
      name: string;
  };
  target: {
      webUrl: string;
      title: string;
      IssueState?: string;
      MergeRequestState?: string;
  };
  note: {
      id: string;
      body: string;
      resolved: boolean;
      discussion: {
          notes: {
              nodes: {
                  body: string;
                  resolved: boolean;
              }[];
          };
      };
  } | null;
}
