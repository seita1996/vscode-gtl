import * as vscode from 'vscode';
import { TaskViewProvider } from './webview/task_view_provider';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "vscode-gitlab-task-list" is now active!');

	const commandId = 'vscode-gitlab-task-list.notify';
	let disposable = vscode.commands.registerCommand(commandId, () => {
		vscode.window.showInformationMessage('nofify!' + ', '
			+ 'gitlaburl:' + vscode.workspace.getConfiguration('gitlab-task-list').get('gitlaburl') + ', '
			+ 'token:' + vscode.workspace.getConfiguration('gitlab-task-list').get('gitlabtoken'));
	});
	context.subscriptions.push(disposable);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			'vscode-gitlab-task-list.notificationsView',
			new TaskViewProvider(context.extensionUri)
		)
	);
}

export function deactivate() {}
