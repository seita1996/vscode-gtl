import * as vscode from 'vscode';
import { NotificationsViewProvider } from './NotificationsViewProvider';

export function activate(context: vscode.ExtensionContext) {
	
	console.log('Congratulations, your extension "vscode-gitlab-task-list" is now active!');

	const commandId = 'vscode-gitlab-task-list.notify';
	_showStatusBarItem(commandId);

	let disposable = vscode.commands.registerCommand(commandId, () => {
		vscode.window.showInformationMessage('nofify!' + ', '
			+ 'gitlaburl:' + vscode.workspace.getConfiguration('gitlab-task-list').get('gitlaburl') + ', '
			+ 'token:' + vscode.workspace.getConfiguration('gitlab-task-list').get('gitlabtoken'));
	});
	context.subscriptions.push(disposable);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			'vscode-gitlab-task-list.notificationsView',
			new NotificationsViewProvider(context.extensionUri)
		)
	);
}

function _showStatusBarItem(commandId: string) {
	const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	statusBarItem.command = commandId;
	statusBarItem.tooltip = 'View GitLab Task List';
	statusBarItem.text = '$(checklist) GitLabTL';
	statusBarItem.show();
}

export function deactivate() {}
