import * as vscode from 'vscode';

let statusBarItem: vscode.StatusBarItem | undefined;

export function showStatusBarNotificationBadge(count: number) {
  if (!statusBarItem) {
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = 'vscode-gtl.gtl';
    statusBarItem.tooltip = 'GitLab Task List';
    statusBarItem.text = `$(check) GTL ${count.toString()}`;
    statusBarItem.show();
  }

  if (count > 0) {
    statusBarItem.color = new vscode.ThemeColor('editorWarning.foreground');
    statusBarItem.text = `$(comments-view-icon) GTL ${count.toString()}`;
  } else {
    statusBarItem.color = undefined;
    statusBarItem.text = `$(check) GTL ${count.toString()}`;
  }

  return statusBarItem;
}
