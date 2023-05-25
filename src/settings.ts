import * as vscode from 'vscode';
import { GitlabSettings } from './types';

export const settings: GitlabSettings = {
  host: vscode.workspace.getConfiguration('gitlab-task-list').get('gitlaburl') as string,
  token: vscode.workspace.getConfiguration('gitlab-task-list').get('gitlabtoken') as string
};
