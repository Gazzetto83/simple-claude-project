import { useEffect, useState } from "react";
import {
  addTodo,
  toggleTodo,
  removeTodo,
  countLeft,
  countDone,
  filterTodos,
  clearCompleted,
} from "./todos.js";

const STORAGE_KEY = "simple-todo";
const THEME_KEY = "simple-todo-theme";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "done", label: "Done" },
];

const EMPTY_MESSAGES = {
  active: { icon: "✨", title: "No active tasks", hint: "Everything is checked off." },
  done: { icon: "📋", title: "Nothing completed yet", hint: "Tick a task to see it here." },
};

function loadTodos() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

function getInitialTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // ignore storage errors and fall back to the OS preference
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function App() {
  const [todos, setTodos] = useState(loadTodos);
  const [text, setText] = useState("");
  const [theme, setTheme] = useState(getInitialTheme);
  const [filter, setFilter] = useState("all");

  // Save to the browser every time the list changes.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // Apply the theme to the page and remember the choice.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  // Show how many tasks are left in the browser tab.
  useEffect(() => {
    const left = countLeft(todos);
    document.title = left > 0 ? `(${left}) Simple To-Do` : "Simple To-Do";
  }, [todos]);

  function handleSubmit(event) {
    event.preventDefault();
    setTodos(addTodo(todos, text));
    setText("");
  }

  const total = todos.length;
  const done = countDone(todos);
  const left = countLeft(todos);
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  const counts = { all: total, active: left, done };
  const visible = filterTodos(todos, filter);
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="app">
      <header className="hero">
        <div className="hero-top">
          <div>
            <h1>My Tasks</h1>
            <p className="hero-date">{today}</p>
          </div>
          <button
            type="button"
            className="theme-toggle"
            role="switch"
            aria-checked={theme === "dark"}
            aria-label="Dark mode"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <span aria-hidden="true">☀</span>
            <span aria-hidden="true">☾</span>
            <span className="knob" aria-hidden="true" />
          </button>
        </div>

        {total > 0 && (
          <div className="progress">
            <div
              className="progress-track"
              role="progressbar"
              aria-label="Tasks completed"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={percent}
            >
              <div className="progress-fill" style={{ width: `${percent}%` }} />
            </div>
            <span className="progress-label">
              {done} of {total} done
            </span>
          </div>
        )}
      </header>

      <section className="content">
        <form onSubmit={handleSubmit} className="add-form">
          <div className="add-input">
            <span className="add-icon" aria-hidden="true">+</span>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add a task…"
              aria-label="New task"
              autoFocus
            />
          </div>
          <button type="submit" className="btn-primary" disabled={!text.trim()}>
            Add
          </button>
        </form>

        {total > 0 && (
          <div className="filters" aria-label="Filter tasks">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className="filter"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
                <span className="badge">{counts[f.id]}</span>
              </button>
            ))}
          </div>
        )}

        {total === 0 ? (
          <div className="empty">
            <span className="empty-icon" aria-hidden="true">🎉</span>
            <p className="empty-title">You're all clear</p>
            <p className="empty-hint">Add your first task above to get started.</p>
          </div>
        ) : visible.length === 0 ? (
          <div className="empty">
            <span className="empty-icon" aria-hidden="true">{EMPTY_MESSAGES[filter].icon}</span>
            <p className="empty-title">{EMPTY_MESSAGES[filter].title}</p>
            <p className="empty-hint">{EMPTY_MESSAGES[filter].hint}</p>
          </div>
        ) : (
          <ul className="list">
            {visible.map((todo) => (
              <li key={todo.id} className={todo.done ? "item done" : "item"}>
                <label>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={todo.done}
                    onChange={() => setTodos(toggleTodo(todos, todo.id))}
                  />
                  <span className="check" aria-hidden="true">
                    <svg viewBox="0 0 16 16">
                      <path d="M3.5 8.5l3 3 6-7" />
                    </svg>
                  </span>
                  <span className="title">{todo.title}</span>
                </label>
                <button
                  type="button"
                  className="remove"
                  onClick={() => setTodos(removeTodo(todos, todo.id))}
                  aria-label={`Remove ${todo.title}`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {total > 0 && (
        <footer className="footer">
          <span>
            {left} {left === 1 ? "task" : "tasks"} left
          </span>
          {done > 0 && (
            <button
              type="button"
              className="link-button"
              onClick={() => setTodos(clearCompleted(todos))}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </main>
  );
}
