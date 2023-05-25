export class ViewTodos {
  constructor(
    private readonly host: string,
    private readonly styleUri: string
  ) {}

  public generate(todos: any[]) {
    const jsonData = this._shapedTodos(todos);

    return `
            <!DOCTYPE html>
            <html lang="ja">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>WebView Example</title>
                <link rel="stylesheet" href="${this.styleUri}">
              </head>
              <body>
                ${this._displayTodos(jsonData)}
              </body>
            </html>
          `;
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

  private _shapedTodos(todos: any) {
    const jsonData = todos.map((item: any) => {
      const targetType = item.targetType === "MERGEREQUEST" ? "MR" : item.targetType;
      return {
        repository: item.project.name,
        title: item.target.title,
        type: targetType,
        avatar: `${this.host}${item.author.avatarUrl}`,
        notificatonType: item.action,
        url: item.target.webUrl,
      };
    });
    return jsonData;
  }
}
