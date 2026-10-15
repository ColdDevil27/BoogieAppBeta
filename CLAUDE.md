# MySSRI: notes for Claude Code

Personal health-information web app (React + TypeScript + Vite, static PWA). Read `README.md` first.

## Rules that matter more than speed

- This app gives medication safety information to real people. Do not invent interactions, doses or sources.
  If you don't know, leave the entry out or mark it `draft` and say so.
- Never mark an entry `"verified"` unless a human has checked it against a source and it lists that source.
- Never show a "low concern" (green) result for anything that isn't an exact entry match. The "Not checked
  yet" state exists for that.
- Keep copy plain and short. No diagnosis, no dosing advice, no "you should stop taking...".
  Always point to a pharmacist or prescriber.
- Don't add accounts, analytics or any network call that sends what a person searched for. Searches stay on
  the device.

## Working here

- Content changes go in `src/data/lexapro/*.json`. Run `npm test` after every data change.
- `npm run build` must pass (it type-checks) before you call a change done.
- UI follows the design tokens in `src/styles.css`: Figtree, indigo accent, red / amber / green with a label
  and icon each, touch targets at least 44px.
