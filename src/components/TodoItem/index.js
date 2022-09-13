import React, { useContext } from 'react';
import { TodoContext } from '../../Context/Todo';

function TodoItem({item, index}) {
  const { setTodoItems } = useContext(TodoContext);

  return (
    <div className="singleTodoItem">
      <div>{item}</div>
      <div>
        <button
          className="removeTodoItem"
          onClick={() => {
            setTodoItems(prev => prev.filter((value, i) => i !== index));
          }}
        >delete</button>
      </div>
    </div>
  );
}

export default TodoItem;
