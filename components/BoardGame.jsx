import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { updateBlocks, updateUser } from '../lib/helpers';

const BoardGame = ({ isAdmin = false, user, users, socket, blocksArangement, usersArrangement = [], blocks = [] }) => {
  const [blks, setBlks] = useState(blocks);
  const [selected, setSelected] = useState([]);
  let nextPlayerTurnIndex = 0;
  let PlayerTurnIndex = 0;
  let playerTurn = users.find((item, i) => {
    if (typeof item.fields.playerTurn === 'object' ? item.fields.playerTurn['en-US'] : item.fields.playerTurn) {
      const currentPlayerTurn = usersArrangement.findIndex((val) => val === item.sys.id)
      nextPlayerTurnIndex = (usersArrangement.length === (currentPlayerTurn + 1)) ? 0 : currentPlayerTurn + 1;
      PlayerTurnIndex = i;
      return item;
    }
  })
  // console.log('blocks blocks', blks);

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
  }, [socket, blks, selected, users]);

  return (
    <Grid container spacing={1} justifyContent="center">
      {blocksArangement.map((id, index) => {
        const block = blks.find((blk) => blk.sys.id === id);

        if (!block) return;

        const imgUrl = block.fields.image?.fields?.file?.url;

        return (
          <Grid key={index} item xs={1}>
            <Box
              className={`box-avatar ${block.fields.isSelected ? 'box-is-selected' : ''}`}
              sx={{
                backgroundImage: `url(${block.fields.isSelected || block.fields.isPaired || isAdmin ? imgUrl : ''})`,
              }}
              onClick={async () => {
                // updateBlocks(block.sys.id, false, false);
                // return;
                if ((playerTurn?.sys?.id !== user.sys.id) || block.fields.isSelected || block.fields.isPaired || selected.length === 2) {
                  return;
                }

                const clickedBlocks = [...selected, block];
                if (clickedBlocks.length <= 2) {
                  setSelected(clickedBlocks);
                  setBlks((prevState) => {
                    const activeBlock = prevState.findIndex(prev => prev.sys.id === block.sys.id);

                    prevState[activeBlock].fields.isSelected = true;
                    socket.emit('blocks', blks);
                    return [...prevState];
                  })

                  if (
                    clickedBlocks.length === 2
                  ) {
                    if (clickedBlocks[0].fields.name === clickedBlocks[1].fields.name) {
                      updateBlocks(clickedBlocks[0].sys.id, false, true);
                      updateBlocks(clickedBlocks[1].sys.id, false, true);
                    }
                    const clonedUsers = [...users];
                    await updateUser(user.sys.id, false, clickedBlocks[0].fields.name === clickedBlocks[1].fields.name).then(async (d) => {
                      clonedUsers[PlayerTurnIndex].fields.playerTurn = false;
                      clonedUsers[PlayerTurnIndex].fields.points = d.fields.points['en-US'];
                      const usersNextTurnIndex = users.findIndex(u => u.sys.id === usersArrangement[nextPlayerTurnIndex]);
                      clonedUsers[usersNextTurnIndex].fields.playerTurn = true;
                      await updateUser(usersArrangement[nextPlayerTurnIndex], true).then(async (e) => {
                        socket.emit('user.create', clonedUsers);
                      })
                    });
                  }
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