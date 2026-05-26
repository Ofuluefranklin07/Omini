import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoLIst";
import { useState } from "react";
export default function App() {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("all");

  const handleAddTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
  };
  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };
  const handleSave = (id, temptext) => {
    if (temptext.trim() === "") return;
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: temptext.trim() } : todo)),
    );
    setEditingId(null);
  };
  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = todos.length - completedCount;
  const progress = todos.length ? Math.round((completedCount / todos.length) * 100) : 0;
  const visibleTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const filters = [
    { id: "all", label: "All" },
    { id: "active", label: "Active" },
    { id: "completed", label: "Done" },
  ];

  return (
    <main className="app-container">
      <header className="app-header">
        <div className="header-copy">
          <p className="eyebrow">Classic task command</p>
          <h1>Ominis Todo</h1>
          <p className="subtitle">
            A refined workspace for planning the day, tracking progress, and keeping tasks tidy.
          </p>
        </div>

        <div className="progress-card" aria-label="Task progress">
          <div className="progress-card-top">
            <span>Progress</span>
            <strong>{progress}%</strong>
          </div>
          <div className="progress-track">
            <span style={{ width: `${progress}%` }} />
          </div>
          <div className="stat-grid">
            <div>
              <span>Total</span>
              <strong>{todos.length}</strong>
            </div>
            <div>
              <span>Open</span>
              <strong>{activeCount}</strong>
            </div>
            <div>
              <span>Done</span>
              <strong>{completedCount}</strong>
            </div>
          </div>
        </div>
      </header>

      <TodoInput onAddTodo={handleAddTodo} />

      <section className="todo-panel">
        <div className="toolbar">
          <div className="filter-tabs" aria-label="Filter tasks">
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                className={filter === item.id ? "active" : ""}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="clear-button"
            onClick={handleClearCompleted}
            disabled={completedCount === 0}
          >
            Clear done
          </button>
        </div>
        <TodoList
          todos={visibleTodos}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEditClick={setEditingId}
          isEditing={editingId}
          onSave={handleSave}
        />
        {visibleTodos.length === 0 && (
          <div className="empty-state">
            <p>No tasks here yet.</p>
            <span>Add a task or switch filters to see your list.</span>
          </div>
        )}
      </section>
    </main>
  );
}
