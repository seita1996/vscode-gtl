// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate({ subscriptions }: vscode.ExtensionContext) {
	
	console.log('Congratulations, your extension "vscode-gitlab-task-list" is now active!');
	
	const commandId = 'vscode-gitlab-task-list.notify';
	
	_showStatusBarItem(commandId);

	// show a message box when the command is called
	let disposable = vscode.commands.registerCommand(commandId, () => {
		vscode.window.showInformationMessage('nofify!!');
	});
	subscriptions.push(disposable);
}

function _showStatusBarItem(commandId: string) {
	const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	statusBarItem.command = commandId;
	statusBarItem.tooltip = 'View GitLab Task List';
	statusBarItem.text = '$(checklist) GitLabTL';
	statusBarItem.show();
}

// This method is called when your extension is deactivated
export function deactivate() {}
