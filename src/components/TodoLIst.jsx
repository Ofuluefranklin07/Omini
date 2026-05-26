import TodoItem from "./TodoItem";
export default function TodoList({ todos, onEditClick, onToggle, onDelete, onSave, isEditing }) {
  return (
    <ul className="todo-list">
      {todos.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          onToggle={onToggle}
          onDelete={onDelete}
          onEditClick={onEditClick}
          isEditing={isEditing === item.id}
          onSave={onSave}
          completed={item.completed}
        />
      ))}
    </ul>
  );
}
