import { Grid } from '@mui/material';

const ScoreBoardContainer = ({users}) => {

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <div className="text-2xl bold">Players</div>
        {users.length ? users.map(({fields}, index) => {
          return (
            <div key={index} className="text-xl">
              {fields.name}
            </div>
          );
        }) : ''}
      </Grid>
      <Grid item xs={6}>
        <div className="text-2xl bold">Score</div>
        {users.length ? users.map(({fields}, index) => {
          return (
            <div key={index} className="text-xl">
              {fields.points}
            </div>
          );
        }) : ''}
      </Grid>
    </Grid>
  );
}

export default ScoreBoardContainer;