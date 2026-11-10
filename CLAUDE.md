# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

A small single-page to-do app built with React 18 and Vite 5. There is no backend:
to-dos and the theme choice are saved in the browser's `localStorage`.

## Commands

- `npm install`: install dependencies (first time only)
- `npm run dev`: start the Vite dev server (usually http://localhost:5173)
- `npm run build`: production build into `dist/`
- `npm run preview`: serve the production build
- `npm test`: run the Vitest suite once

Run `npm test` after every change to the logic in `src/todos.js`.

## Layout

- `index.html`: page shell. It includes an inline script that sets the theme
  before first paint, so the page does not flash the wrong theme.
- `src/main.jsx`: entry point. It mounts `<App />` in `React.StrictMode`.
- `src/App.jsx`: the whole UI (input form, filters, list, footer, theme toggle) and its state.
- `src/todos.js`: pure list functions (add, toggle, remove, count, filter, clear completed).
- `src/todos.test.js`: Vitest tests for `src/todos.js`.
- `src/App.css`: all styling, including light and dark themes keyed off `html[data-theme]`.

## Conventions

- Keep list logic in `src/todos.js` as pure functions that return a **new** array and never
  change their input. `App.jsx` only calls these functions and stores the result with `setTodos`.
- Any new function in `src/todos.js` needs a test in `src/todos.test.js`.
- Prefer the existing helpers (`countLeft`, `countDone`, `filterTodos`, ...) over writing
  new inline `.filter(...)` calls in components.
- Wrap all `localStorage` access in `try/catch`, because storage can be unavailable or full.
- Storage keys: `simple-todo` (the list, a JSON array) and `simple-todo-theme` (`"light"` or `"dark"`).
  If you rename the theme key, also change it in the inline script in `index.html`.
- To-do items have the shape `{ id: number, title: string, done: boolean }`.
- Plain JavaScript and JSX only: no TypeScript and no extra state or styling libraries.
