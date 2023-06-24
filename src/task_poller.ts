import * as vscode from 'vscode';
import { TaskViewProvider } from './webview/task_view_provider';
import { GitlabTodo } from './types';
import { fetchTodos } from './gitlab_api/fetch_todos';
import { showStatusBarNotificationBadge } from './statusbar/notification_badge';

export class TaskPoller {
  private taskView: TaskViewProvider;
  private beforeTodos: GitlabTodo[];

  constructor(taskView: TaskViewProvider) {
    this.taskView = taskView;
    this.beforeTodos = [];
  }

  async startPolling() {
    try {
      const todos = await fetchTodos();
      showStatusBarNotificationBadge(todos.length);
      this.beforeTodos = todos;

      // Load the content of the view (1st load)
      this.taskView.updateView(todos);

      // Load the content of the view (every 10s)
      setInterval(async () => {
        const todos = await fetchTodos();
        showStatusBarNotificationBadge(todos.length);
        const incrementedTodos = this._incrementedTodos(todos);
        this.beforeTodos = todos;
        this.taskView.updateView(todos);
        this._handleIncrementedTodos(incrementedTodos);
      }, 10000);
    } catch {
      vscode.window.showErrorMessage(
        'Fail fetching todos. Please set your GitLab URL and token. And then reload the window.',
        'Open Settings'
        ).then((selection) => {
          if (selection === 'Open Settings') {
            vscode.commands.executeCommand('workbench.action.openSettings', 'gitlab-task-list');
          }
        }
      );
    }
  }

  private _incrementedTodos(todos: GitlabTodo[]): GitlabTodo[] {
    const incrementedTodos: GitlabTodo[] = [];
    todos.forEach((todo: GitlabTodo) => {
      if (!this.beforeTodos.some((beforeTodo: GitlabTodo) => beforeTodo.id === todo.id)) {
        incrementedTodos.push(todo);
      }
    });
    return incrementedTodos;
  }

  private _handleIncrementedTodos(incrementedTodos: GitlabTodo[]) {
    incrementedTodos.forEach((todo: GitlabTodo) => {
      const goToGitLab = "Go to GitLab";
      vscode.window.showInformationMessage(`You are ${todo.action} at ${todo.project.name} ${todo.targetType}.`, goToGitLab)
        .then((selection) => {
          if (selection === goToGitLab) {
            vscode.env.openExternal(vscode.Uri.parse(todo.target.webUrl));
          }
        }
        );
    });
  }
}
