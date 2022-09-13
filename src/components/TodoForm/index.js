import React, { useContext, useRef } from 'react';
import { TodoContext } from '../../Context/Todo';

function TodoForm() {
  const { setTodoItems } = useContext(TodoContext);
  const htmlInput = useRef();
  const htmlForm = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodoItems(prev => {
      return [...prev, htmlInput.current.value]
    });
    setTimeout(() => {
      htmlForm.current.reset();
    }, 50)
  };

  return (
    <form onSubmit={handleSubmit} ref={htmlForm} className="todo-form">
      <input type="text" className="itemInput" ref={htmlInput} required />
      <button className="addItemButton">Add Item</button>
    </form>
  );
}

export default TodoForm;
