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
        const jsonData = [
            {
                "name": "John Doe",
                "age": 30,
                "city": "New York"
            },
            {
                "name": "Jane Smith",
                "age": 25,
                "city": "London"
            },
            {
                "name": "Bob Johnson",
                "age": 40,
                "city": "Osaka"
            }
        ];

        // const jsonData = [
        //     {
        //         id: 1,
        //         title: 'this is title',
        //         description: 'this is description',
        //         type: 'MR',
        //         avatar: 'https://avatars.githubusercontent.com/u/19267892?v=4',
        //         url: 'https://gitlab.com',
        //     },
        //     {
        //         id: 2,
        //         title: 'this is title2',
        //         description: 'this is description2',
        //         type: 'MR',
        //         avatar: 'https://avatars.githubusercontent.com/u/19267892?v=4',
        //         url: 'https://gitlab.com',
        //     },
        // ];
        
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
                <div class="card">
                    <div class="card-header">
                        <div class="flex-between mb-4">
                            <div class="notification__repository">
                                this is repository name
                            </div>
                            <div class="notification__badge">
                                4
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="flex-start mb-4">
                            <div class="notification__icon mr-4">
                                <img src="https://avatars.githubusercontent.com/u/19267892?v=4" alt="Avatar" />
                            </div>
                            <div class="notification__title">
                                this is title
                            </div>
                        </div>
                        <div class="flex-start">
                            <div class="notification__tag mr-4">
                                MR
                            </div>
                            <div class="notification__type">
                                you are assigned
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="output"></div>
                <script src="${scriptUri}" />
            </body>
            </html>
        `;
    }
}
