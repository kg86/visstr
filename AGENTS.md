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
   builds and tests the project, then runs `npm stage publish`. This
   authenticates via npm's Trusted Publisher (OIDC) for this repo/workflow
   and stages the version, but does not make it public yet.

3. A maintainer must promote the staged version with 2FA:

   ```sh
   npm stage list visstr
   npm stage approve <stage-id>
   ```

   Only after this step is the new version publicly available on npm.

4. After pushing the tag, record what changed since the previous version as
   a GitHub Release note (this repo has no `CHANGELOG.md`):

   ```sh
   gh release create vX.Y.Z --generate-notes
   ```

   `--generate-notes` builds the note from the merged PR titles since the
   last release.

5. Versioning follows [Semantic Versioning](https://semver.org/), with the
   pre-1.0 convention that breaking changes bump `minor` instead of `major`
   while the major version is still `0`:
   - `patch`: bug fixes only
   - `minor`: backwards-compatible feature additions, or (while `major` is
     `0`) breaking changes
   - `major`: breaking changes, once the project reaches `1.0.0`

## Other

- CI workflows:
  - `build.yml`: runs build/test on push to any branch
  - `gh-page.yml`: deploys GitHub Pages on push to `main`
  - `release.yml`: stages an npm publish on push of a `v*` tag; a maintainer
    must still approve it with 2FA to make it public
