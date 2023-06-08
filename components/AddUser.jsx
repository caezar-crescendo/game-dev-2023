import { Box, CircularProgress, TextField } from '@mui/material';
import { useState } from 'react';
import { createEntry, getEntriesByContentType } from '../lib/helpers';
import PsychologyIcon from '@mui/icons-material/Psychology';

const AddUser = ({users = [], gameSettings, socket, callback = () => {}}) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="AddUser min-h-[500px] mt-20 flex items-center justify-center">
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={async (e) => {
          e.preventDefault();
          let entry = users.find(item => item.fields.name.toLowerCase().trim() === name.toLowerCase().trim());

          if (!entry && !gameSettings.inProgress) {
            setLoading(true);
            entry = await createEntry({
              name: {
                "en-US": name.trim(),
              },
            }, 'user');

            setLoading(false);
          }

          const u = await getEntriesByContentType("user", true);
          socket.emit('user.create', u.items);
          callback(entry);
        }}
      >
        <h1 className="text-8xl mb-12 font-bold flex">
          The MixMatch Game
          <div className="game-icon">
            <PsychologyIcon />
          </div>
        </h1>
        <div className="bg-white p-5 flex items-center justify-center gap-5">
          <div className="text-5xl">
            Enter Player Name:
          </div>
          <TextField
            required
            className="TextField-player-name"
            value={name}
            inputProps={{
              maxLength: 20,
            }}
            onChange={(event ) => {
              setName(event.target.value);
            }}
            variant="outlined"
          />
          {loading && (
            <CircularProgress />
          )}
        </div>
        {gameSettings.inProgress && (
          <div className="text-xl text-red-500 text-center mt-4">
            A game is currently in progress
          </div>
        )}
      </Box>
    </div>
  )
}

export default AddUser;