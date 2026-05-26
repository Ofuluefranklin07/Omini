import { useState } from 'react';
export default function TodoInput ({onAddTodo}) {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() === "") return; 
            onAddTodo({
                id: Date.now(),
                text: inputValue.trim(),
                completed: false
                    });
            setInputValue("");
        

    };

        return (
            <div className="input-card">
                <form className="todo-input-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Write a new task..."
                        value={inputValue}
                        onChange={handleInputChange}
                        aria-label="New todo"
                    />
                    <button type="submit" aria-label="Add todo">Add task</button>
                </form>
            </div>
        );

}
