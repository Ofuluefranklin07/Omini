import { useState } from "react";
export default function TodoItem({
  onEditClick,
  isEditing,
  onSave,
  item,
  completed,
  onToggle,
  onDelete,
}) {
  const [draftText, setDraftText] = useState(item.text);

  const itemClass = `todo-item${isEditing ? " editing" : ""}`;
  const handleEditClick = () => {
    setDraftText(item.text);
    onEditClick(item.id);
  };

  if (isEditing) {
    return (
      <li className={itemClass}>
        <div className="todo-edit-row">
          <input
            className="todo-edit-input"
            type="text"
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
          />
          <div className="button-group">
            <button type="button" onClick={() => onSave(item.id, draftText)}>
              Save
            </button>
            <button type="button" className="secondary" onClick={() => onEditClick(null)}>
              Cancel
            </button>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className={itemClass}>
      <label className="todo-main">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(item.id)}
        />
        <span className={`todo-text ${completed ? "completed" : ""}`}>
          {item.text}
        </span>
      </label>
      <div className="button-group">
        <button type="button" onClick={handleEditClick}>
          Edit
        </button>
        <button type="button" className="danger" onClick={() => onDelete(item.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}
