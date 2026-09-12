# AGENTS.md

Operating rules for humans and AI agents working in this repository.

## Language

- All documentation in this repository, and all documentation in source code
  (comments, docstrings, etc.), must be written in English.

## Branching

- Never commit or push directly to `main`. All changes must be merged via
  Pull Request.
- Create a working branch, open a PR, and merge only after CI
  (`.github/workflows/build.yml`) passes.
- A single PR must not bump the version. Version bumps and releases are a
  separate process.

## Release process (npm publish)

Versions are managed via **git tags**, not per-PR version bumps in
`package.json`.

Release steps:

1. Once enough PRs have been merged into `main` to warrant a release, the
   release owner runs the following on `main` (locally or via a release
   branch/PR):

   ```sh
   npm version patch   # or minor / major
   git push origin main --follow-tags
   ```

   This updates the `package.json` version and creates/pushes a `vX.Y.Z`
   tag.

2. Pushing a `vX.Y.Z` tag triggers `.github/workflows/release.yml`, which
   builds and tests the project, then runs `npm publish` to the npm
   registry.

3. Versioning follows [Semantic Versioning](https://semver.org/):
   - `patch`: bug fixes only
   - `minor`: backwards-compatible feature additions
   - `major`: breaking changes

## Other

- CI workflows:
  - `build.yml`: runs build/test on push to any branch
  - `gh-page.yml`: deploys GitHub Pages on push to `main`
  - `release.yml`: publishes to npm on push of a `v*` tag
