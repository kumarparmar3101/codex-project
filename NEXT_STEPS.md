# Next Steps: Simple PR Merge Guide (Beginner Friendly)

This repository currently has multiple remote feature branches and open PRs.
Use this checklist to finish safely.

## 1) Sync your local repo

```bash
git fetch origin --prune
git checkout main
git pull origin main
```

## 2) See what is still not merged into `main`

```bash
git branch -r --no-merged origin/main
```

## 3) Merge PRs in this order

1. `codex/set-up-monorepo-layout-and-tooling`
2. `codex/plan-cloning-of-district-and-bookmyshow-apps`
3. `codex/implement-catalog-and-booking-endpoints`
4. `codex/implement-reusable-ui-components-with-theming`
5. `codex/implement-routes-and-pages-for-district-web`
6. `codex/implement-routes-and-pages-for-booking-app`
7. `codex/add-tests-and-ci-pipeline-for-booking-system`
8. `codex/add-planning-document-for-product-scope`

> If two PRs look like duplicates (for example, same feature with a random suffix), keep the cleaner one and close the duplicate.

## 4) For each PR on GitHub

- Open the PR
- Confirm checks are green
- Resolve any merge conflicts
- Use **Squash and merge**

## 5) Clean up merged branches

After each merge:

```bash
git fetch origin --prune
git branch -r --merged origin/main
```

Delete merged remote branches from GitHub (or with `git push origin --delete <branch>`).

## 6) Final sanity check

```bash
git checkout main
git pull origin main
git branch -r --no-merged origin/main
```

If no important feature branches remain, your integration is complete.
