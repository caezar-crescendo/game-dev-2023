import { getEntriesByContentType, updateGameSettings } from '../lib/helpers';
import BoardGame from '../components/BoardGame';
import ScoreBoardContainer from '../components/ScoreBoardContainer';
import { Grid, Paper, Container, Button } from '@mui/material';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:4000');
// const socket = io.connect(process.env.NEXT_PUBLIC_SOCKET);

export default function Admin(props) {
  const { blocks, users, gameSettings } = props;
  console.log('props', props);
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
  const gameSettingBlocksArrangement = gameSettings.items[0].fields.blocksArangement;

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const resetBoardGame = async () => {
    const shuffledBlocks = shuffleArray(blocks.items);
    const ids = shuffledBlocks.map((blk) => blk.sys.id)
    const entry = await updateGameSettings('7I65AWdklNktCr8lqpXFHe', ids);
    console.log('entry', entry);
  };

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
            variant="outlined">
            Reset Score Board
          </Button>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Paper className="p-5 min-h-[90vh] shadow-none rounded-none">
              <BoardGame
                blocksArangement={gameSettingBlocksArrangement || []}
                blocks={blocks.items || []}
                socket={socket}
                user={user}
                isAdmin={true}
              />
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <ScoreBoardContainer users={users.items}/>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export async function getStaticProps() {
  const users = await getEntriesByContentType("user");
  const blocks = await getEntriesByContentType("block");
  const gameSettings = await getEntriesByContentType("gameSettings");

  return {
    props: {
      users,
      blocks,
      gameSettings,
    },
  };
}
