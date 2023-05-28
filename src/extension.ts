import * as vscode from 'vscode';
import { TaskViewProvider } from './webview/task_view_provider';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "vscode-gitlab-task-list" is now active!');

  let activateSidebarDisposable = vscode.commands.registerCommand('vscode-gitlab-task-list.gtl', () => {
    vscode.commands.executeCommand('workbench.view.extension.notificationsView');
  });
  context.subscriptions.push(activateSidebarDisposable);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			'vscode-gitlab-task-list.notificationsView',
			new TaskViewProvider(context.extensionUri)
		)
	);
}

export function deactivate() {}
