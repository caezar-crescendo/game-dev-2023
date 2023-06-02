import { Box, CircularProgress, TextField } from '@mui/material';
import { useState } from 'react';
import { createEntry } from '../lib/helpers';
import PsychologyIcon from '@mui/icons-material/Psychology';
import styles from '../styles/AddUser.module.css';

const AddUser = ({callback = () => {}}) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const GameName = 'MixMatch';
  const letters = GameName.split('');

  return (
    <div className="AddUser min-h-[500px] mt-20 flex items-center justify-center">
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
        <h1 className="text-8xl mb-12 font-bold flex">
          <div className={styles.logo}>
            {letters.map((letter) => <span>{letter}</span>)}
          </div>
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
            onChange={(event ) => {
              setName(event.target.value);
            }}
            variant="outlined"
          />
          {loading && (
            <CircularProgress />
          )}
        </div>
      </Box>
    </div>
  )
}

export default AddUser;