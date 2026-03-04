# Next Steps: Simple PR Merge Guide (Beginner Friendly)

This repository currently has multiple remote feature branches and open PRs.
Use this checklist to finish safely.

## 0) Sync local repo first (mandatory)

Run these commands before reviewing or merging any PR:

```bash
git fetch origin --prune
git checkout main
git pull --ff-only origin main
git checkout work
git merge --ff-only main
```

If `origin` is missing, add it first:

```bash
git remote add origin https://github.com/kumarparmar3101/codex-project.git
git fetch origin --prune
```

## 1) See what is still not merged into `main`

```bash
git branch -r --no-merged origin/main
```

## 2) Merge PRs in this order

1. `codex/set-up-monorepo-layout-and-tooling`
2. `codex/plan-cloning-of-district-and-bookmyshow-apps`
3. `codex/implement-catalog-and-booking-endpoints`
4. `codex/implement-reusable-ui-components-with-theming`
5. `codex/implement-routes-and-pages-for-district-web`
6. `codex/implement-routes-and-pages-for-booking-app`
7. `codex/add-tests-and-ci-pipeline-for-booking-system`
8. `codex/add-planning-document-for-product-scope`

> If two PRs look like duplicates (for example, same feature with a random suffix), keep the cleaner one and close the duplicate.

## 3) For each PR on GitHub

- Open the PR
- Confirm checks are green
- Resolve any merge conflicts
- Use **Squash and merge**

## 4) Clean up merged branches

After each merge:

```bash
git fetch origin --prune
git branch -r --merged origin/main
```

Delete merged remote branches from GitHub (or with `git push origin --delete <branch>`).

## 5) Final sanity check

```bash
git checkout main
git pull --ff-only origin main
git branch -r --no-merged origin/main
```

If no important feature branches remain, your integration is complete.
