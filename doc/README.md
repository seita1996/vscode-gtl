# Document

## Development

We recommend using [volta](https://volta.sh/) for Node.js version control.

Install dependencies and

```
npm install
```

Press F5 key to launch VSCode with extensions installed in debug mode.

Press `Ctrl+,` to open the Settings screen, then type "gtl" in the search bar to see the GTL settings items.

Enter Personal access token (PAT) in Token, GitLab URL in Url, and Reload VSCode.

## Release

Update the version of package.json to the version of the release ( Version must be [Semver](https://semver.org/) )

```json:package.json
{
  ...
  "version": "0.2.7",
  ...
}
```

Update package-lock.json

```
npm install
```

Commit and push

```
git add .
git commit -m "v0.2.7"
git push origin main
```

Add tag

```
git tag -a v0.2.7
git push --tags
```

Push the tag and GitHub Actions will automatically deploy the new version to Marketplace.

⚠ Note that the VSCE_TOKEN (Marketplace access token) set in Settings > Secrets and variables > Actions will expire.
