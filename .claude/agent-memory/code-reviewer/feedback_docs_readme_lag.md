---
name: feedback-docs-readme-lag
description: docs/README.md tends to be left out of restructure plans' "files to update" list in this repo — check it explicitly even when not listed
metadata:
  type: feedback
---

In the 2026-07-16 single-page rebuild, the plan's "Files to Modify" list named `docs/design-guidelines.md` and `docs/tech-stack.md` as docs to update, but `docs/README.md` was not listed and was left stale — it still described the deleted 5-page folder structure, per-page image-usage table, and a "open the console on order.html" instruction after `order.html` no longer existed. This directly violated the plan's own acceptance criterion ("no remaining references to the deleted .html files anywhere").

**Why:** `docs/README.md` isn't always in scope lists because it's treated as project meta-documentation rather than a "docs/" architecture file, but it's the first thing a new contributor reads and is exactly where stale cross-page references hide.

**How to apply:** When reviewing any restructure/rename/deletion-of-pages change in this repo, always grep `docs/README.md` (and `components/*.html` header comments) for references to removed files/paths, even if the plan's file list doesn't mention them. See [[project-single-page-rebuild]].
