import { Grid, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import ScoreBoardContainer from './ScoreBoardContainer';
import BoardGame from './BoardGame';

const Board = ({blocks, socket, user, blocksArangement}) => {
  const [users, setUsers] = useState([]);

  const renderPlayerInfo = () => {
    if (!users.length) {
      return;
    }

    const activeUser = users.find(item => item.sys.id === user.sys.id);

    return activeUser ? (
      <div className="grid grid-cols-2 mb-6">
        <div>Player name: <span className="font-bold">{activeUser.fields.name}</span></div>
        <div>Score: <span className="font-bold">{activeUser.fields.points}</span></div>
      </div>
    ) : '';
  }

  useEffect(() => {
    socket.on('users.list.update', (data) => {
      // console.log('users.list.update', data);
      setUsers(data);
    });
  }, [socket]);

  return (
    <div className="Board min-h-[90vh] flex items-center justify-center">
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Paper className="p-5 min-h-[90vh] shadow-none rounded-none">
            {renderPlayerInfo()}
            <BoardGame
              blocksArangement={blocksArangement || []}
              blocks={blocks || []}
              socket={socket}
              user={user}
              users={users}
            />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <ScoreBoardContainer users={users}/>
        </Grid>
      </Grid>
    </div>
  )
}

export default Board;