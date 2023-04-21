import { Box, CircularProgress, Container, Grid, Paper, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { createEntry, getEntriesByContentType, publishEntry, updatePoints } from '../lib/helpers';
import CategoryQuestionContainer from './CategoryQuestionContainer';
import ScoreBoardContainer from './ScoreBoardContainer';

const Board = ({user, questions}) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setInterval(async  () => {
      const usersEntries = await getEntriesByContentType("user");

      if (typeof usersEntries === 'object' && usersEntries?.items.length) {
        setUsers(usersEntries.items);
        const isActive = usersEntries.items.find(item => item.sys.id === user.sys.id)

        if (isActive && loading) {
          setLoading(false);
        }
      }
    }, 1000);
  }, []);

  return (
    <div className="Board min-h-[90vh] flex items-center justify-center">
      {loading ? (
        <div className="flex items-center justify-center gap-5">
          <h1>Please wait...</h1>
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Paper className="p-5 min-h-[90vh]">
              <div className="grid grid-cols-2">
                <div>{user.fields.name['en-US']}</div>
                <div>Score: {user.fields.points['en-US']}</div>
              </div>
              <CategoryQuestionContainer
                user={user}
                questions={questions}
              />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className="p-5 min-h-[90vh]">
            <ScoreBoardContainer users={users} />
          </Paper>
        </Grid>
      </Grid>
    )}
  </div>
  )
}

export default Board;