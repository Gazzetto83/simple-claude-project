// Plain functions that work on the to-do list.
// Each one returns a NEW list instead of changing the old one (React likes this).

export function addTodo(todos, title) {
  const trimmed = title.trim();
  if (!trimmed) return todos;
  return [...todos, { id: Date.now(), title: trimmed, done: false }];
}

export function toggleTodo(todos, id) {
  return todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
}

export function removeTodo(todos, id) {
  return todos.filter((t) => t.id !== id);
}

export function countLeft(todos) {
  return todos.filter((t) => !t.done).length;
}

export function countDone(todos) {
  return todos.filter((t) => t.done).length;
}

export function filterTodos(todos, filter) {
  if (filter === "active") return todos.filter((t) => !t.done);
  if (filter === "done") return todos.filter((t) => t.done);
  return todos;
}

export function clearCompleted(todos) {
  return todos.filter((t) => !t.done);
}
