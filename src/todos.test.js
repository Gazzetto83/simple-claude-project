import { describe, it, expect } from "vitest";
import {
  addTodo,
  toggleTodo,
  removeTodo,
  countLeft,
  countDone,
  filterTodos,
  clearCompleted,
} from "./todos.js";

const mixed = [
  { id: 1, title: "A", done: true },
  { id: 2, title: "B", done: false },
  { id: 3, title: "C", done: true },
];

describe("todos", () => {
  it("adds a new item that is not done", () => {
    const list = addTodo([], "Buy milk");
    expect(list).toHaveLength(1);
    expect(list[0].title).toBe("Buy milk");
    expect(list[0].done).toBe(false);
  });

  it("ignores empty titles", () => {
    expect(addTodo([], "   ")).toEqual([]);
  });

  it("toggles an item done and back", () => {
    const list = [{ id: 1, title: "A", done: false }];
    const once = toggleTodo(list, 1);
    expect(once[0].done).toBe(true);
    expect(toggleTodo(once, 1)[0].done).toBe(false);
  });

  it("removes an item", () => {
    const list = [
      { id: 1, title: "A", done: false },
      { id: 2, title: "B", done: false },
    ];
    expect(removeTodo(list, 1).map((t) => t.title)).toEqual(["B"]);
  });

  it("counts items left to do", () => {
    const list = [
      { id: 1, title: "A", done: true },
      { id: 2, title: "B", done: false },
    ];
    expect(countLeft(list)).toBe(1);
  });

  it("counts finished items", () => {
    expect(countDone(mixed)).toBe(2);
    expect(countDone([])).toBe(0);
  });

  it("filters by all, active and done", () => {
    expect(filterTodos(mixed, "all")).toHaveLength(3);
    expect(filterTodos(mixed, "active").map((t) => t.title)).toEqual(["B"]);
    expect(filterTodos(mixed, "done").map((t) => t.title)).toEqual(["A", "C"]);
  });

  it("clears completed items without changing the original list", () => {
    expect(clearCompleted(mixed).map((t) => t.title)).toEqual(["B"]);
    expect(mixed).toHaveLength(3);
  });
});
