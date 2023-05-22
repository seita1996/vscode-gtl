import * as vscode from 'vscode';
import { fetchTodos } from './gitlabapi/fetchTodos';
import { settings } from './gitlabapi/settings';

export class NotificationsViewProvider implements vscode.WebviewViewProvider {
    constructor(private readonly extensionUri: vscode.Uri) {}

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
        );

        // Load the content of the view (1st load)
        webviewView.webview.html = await this._getHtmlForWebview(styleUri);

        // Load the content of the view (every 10s)
        setInterval(async () => {
            webviewView.webview.html = await this._getHtmlForWebview(styleUri);
        }, 10000);
    }

    private _displayTodos(data: any) {
        let html = "";

        for (let i = 0; i < data.length; i++) {
            html += `
                <div class="card linkbox">
                    <div class="card-header">
                        <div class="flex-between mb-4">
                            <div class="notification__repository">
                                ${data[i].repository}
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="flex-start mb-4">
                            <div class="notification__icon mr-4">
                                <img src="${data[i].avatar}" alt="Avatar" />
                            </div>
                            <div class="notification__title">
                                ${data[i].title}
                            </div>
                        </div>
                        <div class="flex-start">
                            <div class="notification__tag mr-4">
                                ${data[i].type}
                            </div>
                            <div class="notification__type">
                                ${data[i].notificatonType}
                            </div>
                        </div>
                    </div>
                    <a href="${data[i].url}"></a>
                </div>
            `;
        }

        return html;
    }

    private async _shapedTodos() {
        const resJson = await fetchTodos();

        const jsonData = resJson.map((item: any) => {
            return {
                repository: item.project.name,
                title: item.target.title,
                type: item.targetType,
                avatar: `${settings.host}${item.author.avatarUrl}`,
                notificatonType: item.action,
                url: item.target.webUrl,
            };
        });
        return jsonData;
    }

    private async _getHtmlForWebview(styleUri: vscode.Uri) {
        const jsonData = await this._shapedTodos();

        return `
            <!DOCTYPE html>
            <html lang="ja">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>WebView Example</title>
                <link rel="stylesheet" href="${styleUri}">
            </head>
            <body>
                <div id="output"></div>
                ${this._displayTodos(jsonData)}
            </body>
            </html>
        `;
    }
}
