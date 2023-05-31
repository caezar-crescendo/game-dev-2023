import React from 'react';
import { Box, Grid } from '@mui/material';


const BoardGame = ({ blocks }) => {
  const avatars = [...blocks, ...blocks];

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffledBlocks = shuffleArray(avatars);

  return (
    <Grid container spacing={1} justifyContent="center">
      {shuffledBlocks.map(({ fields, sys }, index) => {
        const imgUrl = fields.image.fields.file.url;

        return (
          <Grid key={index} item xs={1}>
            <Box
              className="box-avatar"
              sx={{
                  backgroundImage: `url(${imgUrl})`,
              }}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default BoardGame;