import { Avatar, Grid, List, ListItem } from '@mui/material';

const ScoreBoardContainer = ({users}) => {
  const stringAvatar = (name) => {
    const alias = (name.split(' ').length > 1) ?
      `${name.split(' ')[0][0]}${name.split(' ')[1][0]}` :
      `${name.split(' ')[0][0]}`;

    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: alias.toUpperCase(),
    };
  };

  const stringToColor = (string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  return (
    <List>
      <ListItem>
        <Grid container>
          <Grid item xs={10}>
            <div className="text-lg font-bold">
              Players
            </div>
          </Grid>
          <Grid item xs={2}>
            <div className="text-lg font-bold">
              Score
            </div>
          </Grid>
        </Grid>
      </ListItem>
      {users.length ? users.map(({fields}, index) => (
        <ListItem key={index} className={`border-b-2 border-gray-300 ${fields.playerTurn ? 'bg-gelb2' : ''}`}>
          <Grid container alignItems="center">
            <Grid item xs={10}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={3}>
                  <Avatar {...stringAvatar(fields.name)} />
                </Grid>
                <Grid item xs={8}>
                  <div className={`text-xl ${fields.playerTurn ? 'font-bold' : ''}`}>
                    {fields.name}
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <div className="text-xl">
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