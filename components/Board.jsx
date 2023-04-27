import { CircularProgress, Grid, Paper } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { getEntriesByContentType } from '../lib/helpers';
import CategoryQuestionContainer from './CategoryQuestionContainer';
import ScoreBoardContainer from './ScoreBoardContainer';

const Board = ({user, questions}) => {
  const loading = useRef(true);
  const [users, setUsers] = useState([]);

  const renderPlayerInfo = () => {
    const activeUser = users.find(item => item.sys.id === user.sys.id);

    return (
      <div className="grid grid-cols-2">
        <div>{activeUser.fields.name}</div>
        <div>Score: {activeUser.fields.points}</div>
      </div>
    );
  }

  useEffect(() => {
    setInterval(async  () => {
      const usersEntries = await getEntriesByContentType("user", !loading.current);

      if (typeof usersEntries === 'object' && usersEntries?.items.length) {
        setUsers(usersEntries.items);
        const isActive = usersEntries.items.find(item => item.sys.id === user.sys.id)

        if (isActive && loading.current) {
          loading.current = false;
        }
      }
    }, 1000);
  }, []);

  return (
    <div className="Board min-h-[90vh] flex items-center justify-center">
      {loading.current ? (
        <div className="flex items-center justify-center gap-5">
          <h1>Please wait...</h1>
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Paper className="p-5 min-h-[90vh]">
              {renderPlayerInfo()}
              <CategoryQuestionContainer
                user={user}
                questions={questions}
              />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className="p-5 min-h-[90vh]">
              <ScoreBoardContainer users={users}/>
            </Paper>
          </Grid>
        </Grid>
      )}
    </div>
  )
}

export default Board;