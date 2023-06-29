import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

  const extensionId = 'seitaro.vscode-gitlab-task-list';

  test("extension should be present", () => {
    assert.ok(vscode.extensions.getExtension(extensionId));
  });

  test('should activate the extension', function () {
    this.timeout(1 * 60 * 1000);
    return vscode.extensions.getExtension(extensionId)!.activate()
        .then((api) => {
            assert.ok(true);
        });
  });

  test('should register all commands', function () {
    return vscode.commands.getCommands(true).then((commands) => {
        commands.forEach((value) => {
            if (value.startsWith('vscode-gitlab-task-list')) {
                console.log(value);
            }
        });
        const COMMANDS = [
            'vscode-gitlab-task-list.gtl'
        ];
        const foundGTLCommands = commands.filter((value) => {
            return COMMANDS.indexOf(value) >= 0 || COMMANDS.includes(value);
        });
        assert.equal(foundGTLCommands.length, COMMANDS.length);
    });
  });
});
