import React, { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { TodoContext } from '../../Context/Todo';

function TodoItem({item, index}) {
  const { setTodoItems } = useContext(TodoContext);

  return (
    <div className="singleTodoItem">
      <div>{item}</div>
      <div>
        <IconButton
          aria-label="delete"
          color="primary"
          onClick={() => {
            setTodoItems(prev => prev.filter((value, i) => i !== index));
          }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default TodoItem;
