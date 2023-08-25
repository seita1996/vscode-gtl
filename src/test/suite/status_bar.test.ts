import * as assert from 'assert';
import * as vscode from 'vscode';
import { showStatusBarNotificationBadge } from '../../status_bar';

suite('Status bar', () => {
  let statusBarItem: vscode.StatusBarItem | undefined;

  test('when there are no notifications, show check icon and the number of notifications', async () => {
    statusBarItem = await showStatusBarNotificationBadge(0);
		assert.strictEqual(statusBarItem.text, `$(check) GTL 0`);
	});

	test('when notification exists, show warningColor comment icon and the number of notifications', async () => {
    statusBarItem = await showStatusBarNotificationBadge(1);
		assert.strictEqual(statusBarItem.text, `$(comments-view-icon) GTL 1`);
    assert.deepStrictEqual(statusBarItem.color, new vscode.ThemeColor('editorWarning.foreground'));
	});
});
