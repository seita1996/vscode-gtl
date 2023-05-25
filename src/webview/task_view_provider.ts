import * as vscode from 'vscode';
import { fetchTodos } from '../gitlab_api/fetch_todos';
import { ViewTodos } from './view_todos';
import { settings } from '../settings';

export class TaskViewProvider implements vscode.WebviewViewProvider {
  constructor(private readonly extensionUri: vscode.Uri) { }

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    // Set up the webview view
    webviewView.webview.options = {
      enableScripts: true,
      enableCommandUris: true
    };

    this._updateView(webviewView);
  }

  private async _updateView(webviewView: vscode.WebviewView) {
    // Uri that enable to load ./public/index.css in the WebView
    const styleUri = webviewView.webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, "public", "index.css")
    ).toString();

    const viewTodos = new ViewTodos(settings.host, styleUri);

    const todos = await fetchTodos();
    let beforeTodos = todos;

    // Load the content of the view (1st load)
    webviewView.webview.html = viewTodos.generate(todos);

    // Load the content of the view (every 10s)
    setInterval(async () => {
      const todos = await fetchTodos();
      const incrementedTodos = this._incrementedTodos(beforeTodos, todos);
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
      webviewView.webview.html = viewTodos.generate(todos);
      beforeTodos = todos;
    }, 10000);
  }

  private _incrementedTodos(beforeTodos: any, afterTodos: any) {
    const diff = afterTodos.filter((afterTodo: any) => {
      return !beforeTodos.some((beforeTodo: any) => {
        return beforeTodo.id === afterTodo.id;
      });
    });
    return diff;
  }
}
