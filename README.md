# GitLab Task List Extension for Visual Studio Code

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

This is a Visual Studio Code extension that allows you to display GitLab TODOs in the sidebar, with notifications for new TODOs when they become available.

![](https://github.com/seita1996/vscode-gitlab-task-list/blob/main/media/GTL.png)

## Features

- Fetches TODO items from GitLab and displays them in the sidebar.
- Notifies you when new TODOs are added to your GitLab projects.

## Requirements

Before using this extension, make sure you have the following:

- Visual Studio Code version 1.78.0 or higher.
- GitLab account with access to relevant projects.
- Personal access token (PAT) with the necessary permissions to access GitLab's API.

## Installation

1. Open Visual Studio Code.
2. Go to the Extensions view (Ctrl+Shift+X or Cmd+Shift+X on macOS).
3. Search for "GitLab Task List" and click on "Install" to install the extension.
4. Once installed, you can configure the extension by going to the extension's settings.

## Configuration

To configure the GitLab Task List extension, follow these steps:

1. Open Visual Studio Code.
2. Go to the Extensions view (Ctrl+Shift+X or Cmd+Shift+X on macOS).
3. Locate the "GitLab Task List" extension and click on "Extension Settings".
4. In the settings, enter your GitLab personal access token (PAT).
5. Specify the GitLab API endpoint URL if you are using a self-hosted GitLab instance.
6. Save the settings.

## Usage

Once the extension is installed and configured, you can use the following steps to view and manage GitLab TODOs:

1. Open Visual Studio Code.
2. Click on the GitLab Task List icon in the activitybar to open the sidebar.
3. The panel will display a list of your GitLab TODO items.
4. Click on a TODO item to open it in your default web browser and view more details.
5. You will receive notifications when new TODOs are added to your GitLab projects.

## Contribution

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please open an issue on the [GitHub repository](https://github.com/seita1996/vscode-gitlab-task-list).

## License

This extension is licensed under the [MIT License](https://opensource.org/licenses/MIT). See the [LICENSE](LICENSE) file for more details.

---

*This extension is not affiliated with GitLab or Visual Studio Code.*
