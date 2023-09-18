import * as vscode from 'vscode';
import { TaskViewProvider } from './task_view_provider';
import { TaskPoller } from './task_poller';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "vscode-gtl" is now active!');

  const taskView = new TaskViewProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			'vscode-gtl.notificationsView',
			taskView
		)
	);

  const taskPoller = new TaskPoller(taskView);
  taskPoller.startPolling();

  let activateSidebarDisposable = vscode.commands.registerCommand('vscode-gtl.gtl', () => {
    vscode.commands.executeCommand('workbench.view.extension.notificationsView');
    taskPoller.oneTimePolling();
  });
  context.subscriptions.push(activateSidebarDisposable);
}

export function deactivate() {}
