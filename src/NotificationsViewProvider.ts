import * as vscode from 'vscode';

export class NotificationsViewProvider implements vscode.WebviewViewProvider {
    constructor(private readonly extensionUri: vscode.Uri) {}

    public resolveWebviewView(webviewView: vscode.WebviewView) {
        // Set up the webview view
        webviewView.webview.options = {
            enableScripts: true,
            enableCommandUris: true
        };

        // WebView 内で`./public/index.js`を読み込み可能にするためのUri
        const scriptUri = webviewView.webview.asWebviewUri(
            vscode.Uri.joinPath(this.extensionUri, "public", "index.js")
        );

        // WebView 内で`./public/index.css`を読み込み可能にするためのUri
        const styleUri = webviewView.webview.asWebviewUri(
            vscode.Uri.joinPath(this.extensionUri, "public", "index.css")
        );

        // Load the content of the view
        webviewView.webview.html = this._getHtmlForWebview(scriptUri, styleUri);
    }

    private _getHtmlForWebview(scriptUri: vscode.Uri, styleUri: vscode.Uri) {
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
                <script src="${scriptUri}" />
            </body>
            </html>
        `;
    }
}
