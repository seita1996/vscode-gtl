import * as vscode from 'vscode';
import { TaskViewProvider } from './webview/task_view_provider';
import { fetchTodos } from './gitlab_api/fetch_todos';
import { showStatusBarNotificationBadge } from './statusbar/notification_badge';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "vscode-gitlab-task-list" is now active!');

  let activateSidebarDisposable = vscode.commands.registerCommand('vscode-gitlab-task-list.gtl', () => {
    vscode.commands.executeCommand('workbench.view.extension.notificationsView');
  });
  context.subscriptions.push(activateSidebarDisposable);

  const taskView = new TaskViewProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			'vscode-gitlab-task-list.notificationsView',
			taskView
		)
	);

  _startPolling(taskView);
}

async function _startPolling(taskView: TaskViewProvider) {
  const todos = await fetchTodos();
  showStatusBarNotificationBadge(todos.length);
  let beforeTodos = todos;

  // Load the content of the view (1st load)
  taskView.updateView(todos);

  // Load the content of the view (every 10s)
  setInterval(async () => {
    const todos = await fetchTodos();
    showStatusBarNotificationBadge(todos.length);
    const incrementedTodos = _incrementedTodos(beforeTodos, todos);
    incrementedTodos.forEach((todo: any) => {
      const goToGitLab = "Go to GitLab";
      vscode.window.showInformationMessage(`You are ${todo.action} at ${todo.project.name} ${todo.targetType}.`, goToGitLab)
        .then((selection) => {
          if (selection === goToGitLab) {
            vscode.env.openExternal(vscode.Uri.parse(todo.target.webUrl));
          }
        }
        );
    });
    taskView.updateView(todos);
    beforeTodos = todos;
  }, 10000);
}

function _incrementedTodos(beforeTodos: any, afterTodos: any) {
  const diff = afterTodos.filter((afterTodo: any) => {
    return !beforeTodos.some((beforeTodo: any) => {
      return beforeTodo.id === afterTodo.id;
    });
  });
  return diff;
}

export function deactivate() {}
