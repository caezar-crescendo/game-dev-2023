import { Box, CircularProgress, TextField } from '@mui/material';
import { useState } from 'react';
import { createEntry } from '../lib/helpers';

const Board = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="Board min-h-[90vh] flex items-center justify-center">
      <h1>Board Here</h1>
    </div>
  )
}

export default Board;