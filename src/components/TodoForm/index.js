import React, { useContext, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { TodoContext } from '../../Context/Todo';

function TodoForm() {
  const { setTodoItems } = useContext(TodoContext);
  const htmlForm = useRef();
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodoItems(prev => {
      return [...prev, value]
    });
    setTimeout(() => {
      htmlForm.current.reset();
      setValue('');
    }, 50)
  };

  return (
    <Box
      className="todo-form"
      component="form"
      autoComplete="off"
      ref={htmlForm}
      onSubmit={handleSubmit}
    >
      <TextField
        variant="outlined"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        required
      />
      <Button
        variant="contained"
        type="submit"
        disableElevation
      >Add Item</Button>
    </Box>
  );
}

export default TodoForm;
