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
`package.json`. Tagging and release notes are automated; only the version
bump itself and the final npm publish approval are manual.

Release steps:

1. Once enough PRs have been merged into `main` to warrant a release, the
   release owner creates a branch named `release/X.Y.Z` off `main`, bumps
   the version there, and opens a PR to `main`:

   ```sh
   npm version patch --no-git-tag-version   # or minor / major
   git add package.json package-lock.json
   git commit -m "Bump version to X.Y.Z"
   ```

   The branch name **must** start with `release/` — this is what triggers
   the automated tagging in the next step.

2. When the release PR merges into `main`, `.github/workflows/tag-release.yml`
   reads the new version from `package.json` and automatically creates and
   pushes the `vX.Y.Z` tag.

3. Pushing the `vX.Y.Z` tag triggers `.github/workflows/release.yml`, which
   builds and tests the project, runs `npm stage publish` (authenticating via
   npm's Trusted Publisher/OIDC for this repo/workflow — stages the version
   without making it public), and then creates a GitHub Release for the tag
   with `gh release create --generate-notes`, listing every PR merged since
   the previous release with a link. This is the version's change record;
   there is no separate `CHANGELOG.md`.

4. A maintainer must promote the staged version with 2FA:

   ```sh
   npm stage list visstr
   npm stage approve <stage-id>
   ```

   Only after this step is the new version publicly available on npm.

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
  - `tag-release.yml`: on merge of a `release/*` PR into `main`, creates and
    pushes the `vX.Y.Z` tag read from `package.json`
  - `release.yml`: on push of a `v*` tag, stages an npm publish and creates
    the GitHub Release notes; a maintainer must still approve the staged
    publish with 2FA to make it public
