const vscode = acquireVsCodeApi();

// done button click event
function done(event, gid) {
  event.target.innerText = 'mark as done';
  event.target.style.fontSize = '12px';
  event.target.cursor = 'none';

  vscode.postMessage({
    command: "done",
    gid: gid,
  });
}
