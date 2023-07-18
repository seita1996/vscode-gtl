import { GitlabTodo } from '../types';

export class ViewTodos {
  constructor(
    private readonly host: string,
    private readonly styleUri: string,
    private readonly scriptUri: string,
    private readonly codiconsCheckUri: string,
    private readonly codiconsHistoryUri: string,
  ) {}

  public generate(todos: GitlabTodo[]) {
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
                <div id="msg" />
                <script src="${this.scriptUri}" />
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
                    <div class="flex-end">
                      <div class="notification__state mr-4">
                        ${this._displayState(data[i].state)}
                      </div>
                      <div class="check-button" onclick="done(event, '${data[i].id}')">
                        <img src="${this.codiconsCheckUri}" />
                        <span></span>
                      </div>
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
                  <div class="flex-between">
                    <div class="flex-start">
                      <div class="mr-4">
                        ${this._displayType(data[i].type)}
                      </div>
                      <div class="notification__type">
                        ${data[i].notificatonType}
                      </div>
                    </div>
                    <div>
                      <img src="${this.codiconsHistoryUri}" />
                      ${data[i].elapsed}
                    </div>
                  </div>
                </div>
                <a href="${data[i].url}"></a>
              </div>
              `;
    }

    return html;
  }

  private _fuzzyTimeDifference(timeFrom: number, timeTo: number) {
    const diffInMilliseconds = Math.abs(timeTo - timeFrom);
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 1) {
      return `${diffInDays} days`;
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInHours > 1) {
      return `${diffInHours} h`;
    } else if (diffInMinutes > 1) {
      return `${diffInMinutes} min`;
    } else {
      return 'Just now';
    }
  }

  private _displayType(type: string) {
    if (type === "ISSUE") {
      return `<div class="badge badge--green">${type}</div>`;
    } else if (type === "MR") {
      return `<div class="badge badge--yellow">${type}</div>`;
    }
  }

  private _displayState(state: string) {
    if (state === "opened") {
      return `<div class="badge badge--red">${state}</div>`;
    } else if (state === "closed") {
      return `<div class="badge badge--blue">${state}</div>`;
    } else if (state === "merged") {
      return `<div class="badge badge--blue">${state}</div>`;
    }
  }

  private _shapedTodos(todos: any) {
    const jsonData = todos.map((item: any) => {
      const targetType = item.targetType === "MERGEREQUEST" ? "MR" : item.targetType;
      return {
        id: item.id,
        elapsed: this._fuzzyTimeDifference(Date.parse(item.createdAt), Date.now()),
        repository: item.project.name,
        title: item.target.title,
        type: targetType,
        avatar: `${this.host}${item.author.avatarUrl}`,
        notificatonType: item.action,
        url: item.target.webUrl,
        state: this._state(item),
      };
    });
    return jsonData;
  }

  private _state(todo: any) {
    if (todo.targetType === "ISSUE") {
      return todo.target.IssueState;
    } else if (todo.targetType === "MERGEREQUEST") {
      return todo.target.MergeRequestState;
    }
  }
}
