import React, { useState } from 'react';
import TodoForm from '../TodoForm';
import TodoItem from '../TodoItem';
import { TodoContext } from '../../Context/Todo';

function TodoApp() {
  const [todoItems, setTodoItems] = useState([
    'Todo List Item #1 test only',
    'Todo List Item #2',
    'Todo List Item #3',
  ]);

  return (
    <TodoContext.Provider value={{ todoItems, setTodoItems }}>
      <div className="todo-list" style={{ maxWidth: '400px', margin: 'auto' }}>
        {todoItems.map((item, index) => (
          <TodoItem
            key={index}
            item={item}
            index={index}
          />
        ))}
      </div>
      <TodoForm />
    </TodoContext.Provider>
  );
}

export default TodoApp;
