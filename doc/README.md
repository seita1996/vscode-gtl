# Document

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
