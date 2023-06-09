import { getEntriesByContentType, updateGameSettings, updateUser } from '../lib/helpers';
import BoardGame from '../components/BoardGame';
import ScoreBoardContainer from '../components/ScoreBoardContainer';
import { Grid, Paper, Container, Button } from '@mui/material';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
// const socket = io.connect('http://localhost:4000');
const socket = io.connect(process.env.NEXT_PUBLIC_SOCKET);

export default function Admin(props) {
  const { blocks } = props;
  const [users, setUsers] = useState([]);
  const [gameSettings, setGameSettings] = useState([]);

  useEffect(() => {
    const loadInitialData = async () => {
      const users = await getEntriesByContentType("user", true);
      const gameSettings = await getEntriesByContentType("gameSettings");

      setGameSettings(gameSettings.items || []);
      setUsers(users.items || []);

      // console.log('loadInitialData', {
      //   users: users.items || [],
      //   gameSettings: gameSettings.items || [],
      // });
    };

    loadInitialData().then(() => {});
  }, []);

  const user = {
    "metadata": {
      "tags": []
    },
    "sys": {
      "space": {
        "sys": {
          "type": "Link",
          "linkType": "Space",
          "id": "8rty9lj73ta8"
        }
      },
      "type": "Entry",
      "id": "3uSaeSPIVR1Hy1fNSFDPaZ",
      "contentType": {
        "sys": {
          "type": "Link",
          "linkType": "ContentType",
          "id": "user"
        }
      },
      "revision": 2,
      "createdAt": "2023-06-05T18:32:42.222Z",
      "updatedAt": "2023-06-06T06:46:20.836Z",
      "environment": {
        "sys": {
          "id": "master",
          "type": "Link",
          "linkType": "Environment"
        }
      },
      "locale": "en-US"
    },
    "fields": {
      "name": "Czar",
      "points": 0,
      "playerTurn": true
    }
  };
  // console.log('gameSettingssss', gameSettings);
  const gameSettingBlocksArrangement = gameSettings[0]?.fields?.blocksArangement;
  const gameSettingUsersArrangement = gameSettings[0]?.fields?.usersArrangement;

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const resetBoardGame = async () => {
    const shuffledBlocks = shuffleArray(blocks.items);
    const ids = shuffledBlocks.map((blk) => blk.sys.id);
    await updateGameSettings('7I65AWdklNktCr8lqpXFHe', {
      blocksArangement: { 'en-US': ids },
      inProgress: { 'en-US': false }
    }).then(data => {
      setGameSettings(prevState => {
        prevState[0].fields.blocksArangement = data?.fields?.blocksArangement['en-US'];

        socket.emit('gameSettings', prevState);
        return [...prevState];
      });
    });
  };

  useEffect(() => {
    socket.on('users.list.update', (data) => {
      // console.log('users.list.update', data);
      setUsers(data);
    });
  }, [socket]);

  return (
    <div className="pt-5">
      <Container maxWidth="xl">
        <div className="mb-4">
          <Button
            className="mr-4"
            variant="outlined"
            onClick={async (e) => {
              await resetBoardGame();
            }}
          >
            Reset Board Game
          </Button>
          <Button
            variant="outlined"
            onClick={async () => {
              const getUsers = await getEntriesByContentType("user");
              // console.log('getUsers', getUsers);
              if (getUsers.items.length) {
                if (!getUsers.items.find(i => i.fields.playerTurn)) {
                  await updateUser(getUsers.items[0].sys.id, true); // update next player
                  getUsers.items[0].fields.playerTurn = true;
                }
                socket.emit('user.create', getUsers.items);

                const usersList = getUsers.items.map(u => {
                  return u.sys.id;
                });
                await updateGameSettings('7I65AWdklNktCr8lqpXFHe', {
                  usersArrangement: { 'en-US': usersList },
                  inProgress: { 'en-US': true }
                }).then(data => {
                  setGameSettings(prevState => {
                    prevState[0].fields.usersArrangement = data?.fields?.usersArrangement['en-US'];
                    prevState[0].fields.inProgress = data?.fields?.inProgress['en-US'];

                    socket.emit('gameSettings', prevState);
                    return [...prevState];
                  });
                });

                socket.emit('blocks', blocks.items);
              }
            }}
          >
            Start Game
          </Button>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Paper className="p-5 min-h-[90vh] shadow-none rounded-none">
              <BoardGame
                blocksArangement={gameSettingBlocksArrangement || []}
                usersArrangement={gameSettingUsersArrangement || []}
                blocks={blocks.items || []}
                socket={socket}
                user={user}
                users={users}
                isAdmin={true}
              />
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <ScoreBoardContainer users={users}/>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export async function getStaticProps() {
  const blocks = await getEntriesByContentType("block");

  return {
    props: {
      blocks,
    },
  };
}

