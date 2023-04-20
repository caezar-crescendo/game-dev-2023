import { Box, CircularProgress, TextField } from '@mui/material';
import { useState } from 'react';
import { createEntry } from '../lib/helpers';

const AddUser = ({callback = () => {}}) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="AddUser min-h-[500px] flex items-center justify-center">
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={async  (e) => {
          e.preventDefault();
          setLoading(true);
          const entry = await createEntry({
            name: {
              "en-US": name,
            },
          }, 'user');

          console.log('entry', entry)
          setLoading(false);
          callback(entry);
        }}
      >
        <div className="bg-white p-5 flex items-center justify-center gap-5">
          <TextField
            required
            label="Enter Name"
            className="min-w-[400px]"
            value={name}
            onChange={(event ) => {
              setName(event.target.value);
            }}
            variant="outlined" />
          {loading && (
            <CircularProgress />
          )}
        </div>
      </Box>
    </div>
  )
}

export default AddUser;