# Simple To-Do — a React playground for Claude Code

A small to-do list app built with React and Vite.

## Start it

```
npm install      # only the first time
npm run dev
```

Then open the address it prints (usually http://localhost:5173).
Your to-dos are saved in the browser, so they stay after a page refresh.

## Run the tests

```
npm test
```

## Where things are

- `src/App.jsx` — the screen: the input box, the list, the buttons
- `src/todos.js` — the logic: add, tick off, remove, count
- `src/todos.test.js` — tests for the logic
- `src/App.css` — the look

## Things to try asking Claude

1. "Explain how App.jsx works, like I'm new to React."
2. "Add a 'Clear completed' button."
3. "Add filter buttons: All / Active / Done."
4. "Let me double-click a to-do to edit its text."
5. "Add a dark mode toggle."
6. "Initialize a git repo and commit this project."
7. Run `/init` so Claude writes a `CLAUDE.md` describing the project.

Tip: ask Claude to run `npm test` after each change so you can see it check its own work.
