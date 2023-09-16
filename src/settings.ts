import * as vscode from 'vscode';
import { GitlabSettings } from './types';

export const settings: GitlabSettings = {
  host: vscode.workspace.getConfiguration('gtl').get('url') as string,
  token: vscode.workspace.getConfiguration('gtl').get('token') as string
};
