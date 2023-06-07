import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { updateBlocks } from '../lib/helpers';

const BoardGame = ({ isAdmin = false, user, socket, blocksArangement, blocks = [] }) => {
  const [blks, setBlks] = useState(blocks);
  const [selected, setSelected] = useState([]);

  const resetSelected = () => {
    const cloneBlocks = [...blks];

    if (selected[0].fields.name === selected[1].fields.name) {
      selected.forEach((item) => {
        cloneBlocks.forEach((p, i) => {
          if (item.sys.id === p.sys.id) {
            cloneBlocks[i].fields.isPaired = true;
            cloneBlocks[i].fields.isSelected = false;
          }
        })
      })
    } else {
      cloneBlocks.forEach((p, i) => {
        cloneBlocks[i].fields.isSelected = false;
      });
    }

    setSelected([]);
    socket.emit('blocks', cloneBlocks);
  };

  useEffect(() => {
    if (selected.length === 2) {
      setTimeout(() => {
        resetSelected();
      }, 2000);
    }
    socket.on('blocks.list.update', (data) => {
      setBlks(data);
    });
    return () => socket.off('blocks.list.update');
  }, [socket, blks, selected]);

  return (
    <Grid container spacing={1} justifyContent="center">
      {blocksArangement.map((id, index) => {
        const block = blks.find((blk) => blk.sys.id === id);

        if (!block) return;

        const imgUrl = block.fields.image?.fields?.file?.url;

        return (
          <Grid key={index} item xs={1}>
            <Box
              className={`box-avatar`}
              sx={{
                backgroundImage: `url(${block.fields.isSelected || block.fields.isPaired || isAdmin ? imgUrl : ''})`,
              }}
              onClick={async () => {
                if (!(typeof user.fields.playerTurn === 'object' ? user.fields.playerTurn['en-US'] : user.fields.playerTurn) || block.fields.isSelected || block.fields.isPaired) {
                  return;
                }

                const clickedBlocks = [...selected, block];
                if (clickedBlocks.length <= 2) {
                  if (
                    clickedBlocks.length === 2 &&
                    clickedBlocks[0].fields.name === clickedBlocks[1].fields.name
                  ) {
                    updateBlocks(clickedBlocks[0].sys.id, false, true);
                    updateBlocks(clickedBlocks[1].sys.id, false, true);
                  }

                  setSelected(clickedBlocks);

                  setBlks((prevState) => {
                    const activeBlock = prevState.findIndex(prev => prev.sys.id === block.sys.id);

                    prevState[activeBlock].fields.isSelected = true;
                    socket.emit('blocks', blks);
                    return [...prevState];
                  })
                }
              }}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default BoardGame;