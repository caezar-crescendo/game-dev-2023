import { CircularProgress, Grid, Paper } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { getEntriesByContentType } from '../lib/helpers';
import CategoryQuestionContainer from './CategoryQuestionContainer';
import ScoreBoardContainer from './ScoreBoardContainer';
import BoardGame from './BoardGame';

const Board = ({user, blocks}) => {
  const loading = useRef(true);
  const [users, setUsers] = useState([]);

  const renderPlayerInfo = () => {
    const activeUser = users.find(item => item.sys.id === user.sys.id);

    return (
      <div className="grid grid-cols-2 mb-6">
        <div>Player name: <span className="font-bold">{activeUser.fields.name}</span></div>
        <div>Score: <span className="font-bold">{activeUser.fields.points}</span></div>
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
          <Grid item xs={9}>
            <Paper className="p-5 min-h-[90vh] shadow-none rounded-none">
              {renderPlayerInfo()}
              <BoardGame blocks={blocks || []} />
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <ScoreBoardContainer users={users}/>
          </Grid>
        </Grid>
      )}
    </div>
  )
}

export default Board;