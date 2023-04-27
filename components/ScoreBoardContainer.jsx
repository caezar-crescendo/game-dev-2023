import { Grid, List, ListItem } from '@mui/material';

const ScoreBoardContainer = ({users}) => {

  return (
    <List>
      <ListItem>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <div className="text-lg font-bold">
              Players
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="text-lg font-bold">
              Score
            </div>
          </Grid>
        </Grid>
      </ListItem>
      {users.length ? users.map(({fields}, index) => (
        <ListItem key={index} className="border-b-2 border-gray-300">
          <Grid container spacing={2}>
            <Grid item xs={8}>

              <div className="text-2xl">
                {fields.name}
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="text-2xl">
                {fields.points}
              </div>
            </Grid>
          </Grid>
        </ListItem>
      )) : ''}
    </List>
  );
}

export default ScoreBoardContainer;