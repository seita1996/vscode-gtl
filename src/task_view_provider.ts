import * as vscode from 'vscode';
import { initGraphqlApi } from './gitlab_api/init_graphql_api';
import { GitlabTodo } from './types';
import { ViewTodos } from './view/view_todos';
import { settings } from './settings';

export class TaskViewProvider implements vscode.WebviewViewProvider {
  wvv!: vscode.WebviewView;
  constructor(private readonly extensionUri: vscode.Uri) { }

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    // Set up the webview view
    webviewView.webview.options = {
      enableScripts: true,
      enableCommandUris: true
    };

    this.wvv = webviewView;

    // Sets up an event listener to listen for messages passed from the webview view context
    // and executes code based on the message that is recieved
    this._setWebviewMessageListener();
  }

  public async updateView(todos: GitlabTodo[]) {
    // Uri that enable to load ./public/index.css in the WebView
    const styleUri = this.wvv.webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, "public", "index.css")
    ).toString();
    const scriptUri = this.wvv.webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, "public", "main.js")
    ).toString();
    const codiconsCheckUri = this.wvv.webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, "public", "codicons-check.svg")
    ).toString();
    const codiconsHistoryUri = this.wvv.webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, "public", "codicons-history.svg")
    ).toString();

    const viewTodos = new ViewTodos(settings.host, styleUri, scriptUri, codiconsCheckUri, codiconsHistoryUri);

    // Display the todos in the webview view
    this.wvv.webview.html = viewTodos.generate(todos);
  }

  private _setWebviewMessageListener() {
    this.wvv.webview.onDidReceiveMessage((message) => {
      const command = message.command;
      const gid = message.gid;

      switch (command) {
        case 'done':
          const gitlabGraphqlApi = initGraphqlApi(settings);
          gitlabGraphqlApi.todoMarkAsDone(gid);
          break;
      }
    });
  }
}
